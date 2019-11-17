import uuidv4 from 'uuid/v4';

export default class Shipment {
	constructor({
		id, client, origin, destination, mode, etd, eta, status,
	}) {
		this.id = id || uuidv4();
		this.client = client;
		this.origin = origin;
		this.destination = destination;
		this.mode = mode;
		this.etd = etd;
		this.eta = eta;
		this.status = status;
	}

	validate() {
		this.validateMode();
		this.validateStatus();
	}

	validateMode() {
		const valid = ['Rail', 'Air', 'Sea', 'Road'];

		if (valid.includes(this.mode)) {
			return true;
		}

		throw new Error(`Invalid Mode "${this.mode}" - Must be one of "${valid.join(', ')}"`);
	}

	validateStatus() {
		const valid = ['Arrived', 'TransportError', 'In Transit', 'Roll-Over', 'Cancelled', 'Customs Hold'];

		if (valid.includes(this.status)) {
			return true;
		}

		throw new Error(`Invalid Status "${this.status}" - Must be one of "${valid.join(', ')}"`);
	}
}
