import axios from 'axios';

export default class TicketService {
  static async getAllTickets() {
    const response = await axios.get(
      'https://api.travelpayouts.com/v2/prices/latest?currency=usd&period_type=year&page=2&limit=30&show_to_affiliates=true&sorting=price&trip_class=0&token=48d0ed69279092627a6b0940646610b9'
    );
    return response.data;
  }
}
