import axios from 'axios';

export default class TicketService {
  static async getAllTickets() {
    const response = await axios.get(
      'https://api.travelpayouts.com/v2/prices/month-matrix?currency=rub&show_to_affiliates=true&origin=LED&destination=HKT&token=48d0ed69279092627a6b0940646610b9'
    );
    return response.data;
  }
}
