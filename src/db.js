import low from 'lowdb';
import lodashId from 'lodash-id';
import LocalStorage from 'lowdb/adapters/LocalStorage';

import Shipment from './models/shipment';

const adapter = new LocalStorage('db');
const db = low(adapter);

db._.mixin(lodashId);

db.read();

// Data is automatically saved to localStorage
db.defaults({ shipments: [], hasLoadedShipmentData: false })
	.write();

const dbReady = new Event('db-ready');

if (!db.get('hasLoadedShipmentData').value()) {
	// Get our premade data
	fetch('/shipment-data.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Failed to fetch shipment data');
			}

			return response.json();
		})
		.then((shipments) => {
			const valid = [];
			const invalid = [];

			for (let i = 0; i < shipments.length; i += 1) {
				const shipment = new Shipment(shipments[i]);

				try {
					shipment.validate();

					valid.push(shipment);
				} catch (err) {
					console.error(err, shipment);
					invalid.push(shipment);
				}
			}

			console.groupCollapsed('Valid Pre-supplied Shipments');
			console.table(valid);
			console.groupEnd();

			console.groupCollapsed('Invalid Pre-supplied Shipments');
			console.table(invalid);
			console.groupEnd();

			const collection = db.get('shipments');

			for (let i = 0; i < valid.length; i += 1) {
				try {
					collection.insert(valid[i]).write();
				} catch (err) {
					console.error(err, valid[i]);
				}
			}

			collection.write();

			db.set('hasLoadedShipmentData', true).write();
		})
		.then(() => {
			db.ready = true;
			document.body.dispatchEvent(dbReady);
		});
} else {
	db.ready = true;
	document.body.dispatchEvent(dbReady);
}

export default db;
