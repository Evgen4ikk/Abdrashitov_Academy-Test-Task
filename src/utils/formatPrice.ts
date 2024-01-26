export function formatPrice(price: number): string {
  const parts = price.toFixed(2).toString().split('.');

  const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const formattedPrice =
    parts[1] === '00' ? formattedInteger : `${formattedInteger}.${parts[1]}`;

  return formattedPrice;
}

