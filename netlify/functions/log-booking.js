exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }
  var url = "https://script.google.com/macros/s/AKfycbxwPpTMSM8fNsJ8KXVWRnGWkHIemlits21Ek1ENF0DtPbYhhIBTR0VO1UizWgAEoVMJ4w/exec";
  try {
    var response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body
    });
    var text = await response.text();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: err.message })
    };
  }
};
