(function () {
  function logPayPal(msg, obj) {
    const el = document.getElementById("paypalDebug");
    let line = "[" + new Date().toLocaleTimeString() + "] " + msg;

    if (obj) {
      try {
        line += "\n" + JSON.stringify(obj, null, 2);
      } catch (e) {
        line += "\n" + String(obj);
      }
    }

    console.log("PAYPAL DEBUG:", msg, obj || "");

    const previous = sessionStorage.getItem("paypalDebugLog") || "";
    sessionStorage.setItem("paypalDebugLog", line + "\n\n" + previous);

    if (el) {
      el.textContent = line + "\n\n" + previous;
    }
  }

  window.addEventListener("load", function () {
    const el = document.getElementById("paypalDebug");
    const previous = sessionStorage.getItem("paypalDebugLog");
    if (el && previous) {
      el.textContent = previous;
    }

    if (!window.paypal) {
      logPayPal("PayPal SDK not loaded");
      return;
    }

    const container = document.getElementById("paypal-button-container");
    if (!container) {
      logPayPal("PayPal container not found");
      return;
    }

    logPayPal("Rendering PayPal buttons");

    paypal.Buttons({
      style: {
        color: "gold",
        shape: "rect",
        layout: "vertical"
      },

      onClick: function (data, actions) {
        logPayPal("onClick fired", data);
      },

      createOrder: function (data, actions) {
        const val = calcPmt();
        logPayPal("createOrder started", { calcPmt: val });

        const payload = {
          purchase_units: [
            {
              amount: {
                value: String(Number(val || 0).toFixed(2))
              }
            }
          ]
        };

        logPayPal("createOrder payload", payload);

        return actions.order.create(payload).then(function (orderId) {
          logPayPal("createOrder success", { orderId: orderId });
          return orderId;
        }).catch(function (err) {
          logPayPal("createOrder failed", err);
          throw err;
        });
      },

      onApprove: function (data, actions) {
        logPayPal("onApprove fired", data);

        return actions.order.capture().then(function (details) {
          logPayPal("capture success", details);

          const payerName =
            details &&
            details.payer &&
            details.payer.name &&
            details.payer.name.given_name
              ? details.payer.name.given_name
              : "";

          if (payerName) {
            const name1 = document.getElementById("name1");
            const name2 = document.getElementById("name2");
            if (name1) name1.innerText = payerName;
            if (name2) name2.innerText = payerName;
          }

          closePayPal();
        }).catch(function (err) {
          logPayPal("capture failed", err);
          alert("Payment was approved but capture failed.");
        });
      },

      onCancel: function (data) {
        logPayPal("onCancel fired", data);
        alert("PayPal checkout was cancelled.");
      },

      onError: function (err) {
        logPayPal("onError fired", err);
        alert("An error prevented checkout with PayPal.");
      }
    }).render("#paypal-button-container")
      .then(function () {
        logPayPal("PayPal buttons rendered successfully");
      })
      .catch(function (err) {
        logPayPal("PayPal buttons failed to render", err);
      });
  });
})();
