"use server";

import { redirect } from "next/navigation";

export async function get_portfolio() {
  const response = await fetch(`http://localhost:4000/portfolio/algofi`);
  const portfolio_data = await response.json();
  return portfolio_data;
}

export const create_ip = async (ip_data) => {
  try {
    const response = await fetch(`http://localhost:4000/vault`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ip_data),
    });
    return { data: response.json() };
  } catch (e) {
    return { error: "error posting" };
  }
};
