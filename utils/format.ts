export function getFormattedDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getFormattedAmount(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function formattedInput(input: string) {
  return Number(input).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
