"use server";

import axios from "axios";

export async function get_portfolio() {
  const response = await fetch(`http://localhost:4000/portfolio/algofi`);
  const portfolio_data = await response.json();
  return portfolio_data;
}

export const update_listing_status = async (listing_payload) => {
  try {
    const response = await axios.patch(
      "http://localhost:4000/vault/market-status",
      listing_payload,
    );
    return { data: response.data };
  } catch (e) {
    return { error: "error posting" };
  }
};

export const create_ip = async (ip_data) => {
  try {
    const response = await fetch(`http://localhost:4000/vault/asset`, {
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

export const update_ip = async (ip_data) => {
  try {
    const response = await fetch(`http://localhost:4000/vault/asset`, {
      method: "PATCH",
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

export const delete_ip = async (ip_data) => {
  try {
    const response = await axios.delete("http://localhost:4000/vault/asset", {
      data: ip_data,
    });

    return { data: response.data };
  } catch (e) {
    return { error: "error delete" };
  }
};
