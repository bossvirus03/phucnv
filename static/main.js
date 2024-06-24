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
function generateKeysFromRandom() {
  const p = parseInt(document.getElementById("value-random-p").innerText);
  const a = parseInt(document.getElementById("value-random-a").innerText);
  const x = parseInt(document.getElementById("value-random-x").innerText);

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
function getRandom() {
  fetch("/getrandompxa", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const { p, x, a } = data;
      console.log(p, x, a);
      document.getElementById("value-random-p").innerText = p;
      document.getElementById("value-random-x").innerText = x;
      document.getElementById("value-random-a").innerText = a;
    });
}

function copyEncrypt() {
  let copyText = document.getElementById("encrypted-text");

  if (copyText.tagName === "INPUT" || copyText.tagName === "TEXTAREA") {
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  } else {
    let range = document.createRange();
    range.selectNode(copyText);
    window.getSelection().removeAllRanges(); // Clear any existing selections
    window.getSelection().addRange(range); // Select the text
  }

  // Copy the selected text to the clipboard
  navigator.clipboard
    .writeText(window.getSelection().toString())
    .then(() => {
      alert("Copied the text: " + window.getSelection().toString());
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
function copyDecrypt() {
  let copyText = document.getElementById("decrypted-text");

  if (copyText.tagName === "INPUT" || copyText.tagName === "TEXTAREA") {
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  } else {
    let range = document.createRange();
    range.selectNode(copyText);
    window.getSelection().removeAllRanges(); // Clear any existing selections
    window.getSelection().addRange(range); // Select the text
  }

  // Copy the selected text to the clipboard
  navigator.clipboard
    .writeText(window.getSelection().toString())
    .then(() => {
      alert("Copied the text: " + window.getSelection().toString());
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
