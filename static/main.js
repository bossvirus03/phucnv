function generateKeys() {
  const p = document.getElementById("p").value;
  const a = document.getElementById("a").value;
  const x = document.getElementById("x").value;

  fetch("/keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p: p, a: a, x: x }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("public-key").innerText = JSON.stringify(
        data.public_key
      );
      document.getElementById("private-key").innerText = JSON.stringify(
        data.private_key
      );
      document.getElementById("keys-section").style.display = "block";
      document.getElementById("encrypto-form").style.display = "block";
      document.getElementById("decrypto-form").style.display = "block";
    });
}

function encryptText() {
  const inputText = document.getElementById("input-encrypt-text").value;
  const publicKey = JSON.parse(document.getElementById("public-key").innerText);

  fetch("/encrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: inputText, public_key: publicKey }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("encrypted-text").innerText =
        JSON.stringify(data);
    });
}

function decryptText() {
  const encryptedText = document.getElementById("input-decrypt-text").value;
  let str = encryptedText;
  let arr = JSON.parse(str);
  const privateKey = JSON.parse(
    document.getElementById("private-key").innerText
  );

  fetch("/decrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      encrypted_text: arr,
      private_key: privateKey,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("decrypted-text").innerText = data;
    });
}
