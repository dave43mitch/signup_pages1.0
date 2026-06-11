const appData = {
  registration: "Live",
  price: 50,
  msgClosed: "Signups are currently closed.",
  guestSignup: "guest@example.com",
  choice: "meal",
  choice1: "Roast Beef",
  choice2: "Salmon",
  choice3: "Vegetarian",
  total: 3,
  noChoice1: 1,
  noChoice2: 1,
  noChoice3: 1,
  logo1: "https://via.placeholder.com/75",
  row4: "Lions Crab Feed",
  row5: "Saturday, July 20",
  row6: "Community Hall",
  row7: "123 Main Street",
  row8: "Doors open at 5:00 PM",
  row9: "Dinner starts at 6:00 PM",
  row10: "Please register early",
  row11: "",
  row12: "",
  row13: "",
  row14: "",
  row15: "",
  row16: "",
  row17: "Signup now",
  row18: "",
  row19: "",
  row20: "",
  row21: "",
  row22: "",
  row24: "",
  row25: "",
  row26: "",
  row27: "We look forward to seeing you!"
};

const members = [
  [0, "Dave Mitchell", "", "dave@example.com"],
  [1, "Jane Smith", "", "jane@example.com"],
  [2, "Tom Brown", "", "tom@example.com"]
];

const signUps = [
  ["", "Dave Mitchell", "", "", "", "", "dave@example.com", ""],
  ["", "Jane Smith", "", "", "", "", "jane@example.com", ""],
  ["", "Tom Brown", "", "", "", "", "tom@example.com", ""]
];

function showEl(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "block";
}

function hideEl(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

function hidePages() {
  [
    "pageWebOpen",
    "pageEmail",
    "pageChoice",
    "pageGuest1",
    "pageGuest2",
    "pageGuest3",
    "pageGuest4",
    "pageClosed",
    "pageSignups",
    "pagePaypal",
    "pageThank"
  ].forEach(hideEl);
}

function showPage(id) {
  hidePages();
  showEl(id);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initializeApp() {
  document.getElementById("logo1").src = appData.logo1;
  document.getElementById("titleText").innerText = appData.row4;
  document.getElementById("row5").innerText = appData.row5;
  document.getElementById("row6").innerText = appData.row6;
  document.getElementById("row7").innerText = appData.row7;
  document.getElementById("row8").innerText = appData.row8;
  document.getElementById("row9").innerText = appData.row9;
  document.getElementById("row10").innerText = appData.row10;
  document.getElementById("row11").innerText = appData.row11;
  document.getElementById("row12").innerText = appData.row12;
  document.getElementById("row13").innerText = appData.row13;
  document.getElementById("row14").innerText = appData.row14;
  document.getElementById("row15").innerText = appData.row15;
  document.getElementById("row16").innerText = appData.row16;
  document.getElementById("row17").innerText = appData.row17;
  document.getElementById("row18").innerText = appData.row18;
  document.getElementById("row19").innerText = appData.row19;
  document.getElementById("row20").innerText = appData.row20;
  document.getElementById("row21").innerText = appData.row21;
  document.getElementById("row22").innerText = appData.row22;
  document.getElementById("row24").innerText = appData.row24;
  document.getElementById("row25").innerText = appData.row25;
  document.getElementById("row26").innerText = appData.row26;
  document.getElementById("row27").innerText = appData.row27;
  document.getElementById("thankMessage").innerText = appData.row27;
  document.getElementById("date2").innerText = appData.row5;

  document.getElementById("mchoice1").value = appData.choice1;
  document.getElementById("mchoice2").value = appData.choice2;
  document.getElementById("mchoice3").value = appData.choice3;
  document.getElementById("mlabel1").innerText = appData.choice1;
  document.getElementById("mlabel2").innerText = appData.choice2;
  document.getElementById("mlabel3").innerText = appData.choice3;

  ["g1","g2","g3","g4"].forEach(function(prefix) {
    document.getElementById(prefix + "choice1").value = appData.choice1;
    document.getElementById(prefix + "choice2").value = appData.choice2;
    document.getElementById(prefix + "choice3").value = appData.choice3;
    document.getElementById(prefix + "label1").innerText = appData.choice1;
    document.getElementById(prefix + "label2").innerText = appData.choice2;
    document.getElementById(prefix + "label3").innerText = appData.choice3;
  });

  renderSignups();

  if (appData.registration === "Live") {
    showEl("btnSignup");
    hideEl("btnSignupClosed");
  } else {
    hideEl("btnSignup");
    showEl("btnSignupClosed");
  }

  if (appData.choice === "none") {
    hideEl("g1Choices");
    hideEl("g2Choices");
    hideEl("g3Choices");
    hideEl("g4Choices");
  }

  showPage("pageWebOpen");
}

function renderSignups() {
  const tbody = document.querySelector("#signupsTable tbody");
  tbody.innerHTML = "";
  document.getElementById("signupTotal").innerText = signUps.length;

  signUps.forEach(function(row) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row[1] || ""}</td>
      <td>${row[6] || ""}</td>
      <td>${row[2] || ""}</td>
      <td>${row[7] || ""}</td>
    `;
    tbody.appendChild(tr);
  });
}

function openPageEmail() {
  showPage("pageEmail");
}

function openRegClosed() {
  $.alert({
    title: appData.msgClosed,
    content: ""
  });
}

function viewSignups() {
  showPage("pageSignups");
}

function btn1PageSignups() {
  showPage("pageWebOpen");
}

function nextPageEmail() {
  const eMail = document.getElementById("email").value || "";
  const email = eMail.toLowerCase();

  const mEmails = members.map(r => (r[3] || "").toLowerCase());
  const indexEmail = mEmails.indexOf(email);

  const signedUp = signUps.map(r => (r[6] || "").toLowerCase());
  const indexSignedUp = signedUp.indexOf(email);

  const isMember = indexEmail >= 0;
  const isSignedUp = indexSignedUp >= 0;
  const guestReg = appData.guestSignup !== "no";

  if (isMember && !isSignedUp) {
    document.getElementById("memMeal").value = 1;
    document.getElementById("index").value = indexEmail;

    const name = members[indexEmail][1];

    if (appData.choice === "none") {
      haveCommentNoChoice(name);
    } else {
      showPage("pageChoice");
      document.getElementById("choiceTitle").innerText =
        "Hello " + name + ", please choose your meal";
    }
    return;
  }

  if (isMember && isSignedUp) {
    const name = members[indexEmail][1];

    $.confirm({
      title: "Hello " + name + " you have already signed up, do you want to signup a guest(s)",
      content: "",
      buttons: {
        Yes: function () {
          showPage("pageGuest1");
        },
        No: function () {
          showPage("pageWebOpen");
        }
      }
    });
    return;
  }

  if (!isMember) {
    if (guestReg && email === appData.guestSignup) {
      showPage("pageGuest1");
    } else {
      document.getElementById("email").value = "";
      $.alert({ title: "Please enter a valid email", content: "" });
    }
  }
}

function backPageEmail() {
  showPage("pageWebOpen");
  document.getElementById("email").value = "";
  document.getElementById("memMeal").value = "";
  document.getElementById("index").value = "";
}

function nextPageChoice() {
  const mchoice = document.forms["form"]["mchoice"].value;
  const idx = document.getElementById("index").value;
  const name = (idx !== "" && idx >= 0 && members[idx]) ? members[idx][1] : "";

  if (mchoice === "") {
    $.alert({ title: "Please select your meal", content: "" });
  } else {
    haveCommentSu(name);
  }
}

function backPageChoice() {
  showPage("pageEmail");
  document.getElementById("mchoice1").checked = false;
  document.getElementById("mchoice2").checked = false;
  document.getElementById("mchoice3").checked = false;
}

function nextPageGuest() {
  const nGuests = document.getElementById("nGuests").value;
  let gname = "";
  let gchoice = "";

  if (nGuests === "") {
    gname = document.forms["form"]["g1name"].value;
    gchoice = document.forms["form"]["g1choice"].value;
  } else if (nGuests == 1) {
    gname = document.forms["form"]["g2name"].value;
    gchoice = document.forms["form"]["g2choice"].value;
  } else if (nGuests == 2) {
    gname = document.forms["form"]["g3name"].value;
    gchoice = document.forms["form"]["g3choice"].value;
  } else if (nGuests == 3) {
    gname = document.forms["form"]["g4name"].value;
    gchoice = document.forms["form"]["g4choice"].value;
  }

  if (gname === "") {
    $.alert({ title: "Please enter your guest name", content: "" });
    return;
  }

  if (appData.choice !== "none" && gchoice === "") {
    $.alert({ title: "Please select your guest meal", content: "" });
    return;
  }

  if (nGuests === "") {
    document.getElementById("nGuests").value = 1;
    haveAnotherGuest();
  } else if (nGuests == 1) {
    document.getElementById("nGuests").value = 2;
    haveAnotherGuest();
  } else if (nGuests == 2) {
    document.getElementById("nGuests").value = 3;
    haveAnotherGuest();
  } else if (nGuests == 3) {
    document.getElementById("nGuests").value = 4;
    maxGuests();
  }
}

function backPageGuest() {
  const nGuests = document.getElementById("nGuests").value;

  if (nGuests === "") {
    showPage("pageEmail");
    document.getElementById("g1name").value = "";
    document.getElementById("g1choice1").checked = false;
    document.getElementById("g1choice2").checked = false;
    document.getElementById("g1choice3").checked = false;
    document.getElementById("g1comment").value = "";
    return;
  }

  if (nGuests == 1) {
    showPage("pageGuest1");
    document.getElementById("nGuests").value = "";
    return;
  }

  if (nGuests == 2) {
    showPage("pageGuest2");
    document.getElementById("nGuests").value = 1;
    return;
  }

  if (nGuests == 3) {
    showPage("pageGuest3");
    document.getElementById("nGuests").value = 2;
  }
}

function calcPmt() {
  const memMeal = +document.getElementById("memMeal").value || 0;
  const nGuests = +document.getElementById("nGuests").value || 0;
  const nMeals = memMeal + nGuests;
  return Number(appData.price || 0) * nMeals;
}

function closePayPal() {
  submitForm();
  showPage("pageThank");
}

function backPayPal() {
  const nGuests = document.getElementById("nGuests").value;

  if (nGuests === "") {
    showPage("pageEmail");
  } else if (nGuests == 1) {
    showPage("pageGuest1");
    document.getElementById("nGuests").value = "";
  } else if (nGuests == 2) {
    showPage("pageGuest2");
    document.getElementById("nGuests").value = 1;
  } else if (nGuests == 3) {
    showPage("pageGuest3");
    document.getElementById("nGuests").value = 2;
  } else if (nGuests == 4) {
    showPage("pageGuest4");
    document.getElementById("nGuests").value = 3;
  }
}

function haveCommentSu(name) {
  $.confirm({
    title: "Do you have a comment?",
    content: "",
    buttons: {
      Yes: function () {
        yourCommentSu(name);
      },
      No: function () {
        haveGuest(name);
      }
    }
  });
}

function haveCommentNoChoice(name) {
  $.confirm({
    title: "Hello " + name + ", do you have a comment?",
    content: "",
    buttons: {
      Yes: function () {
        yourCommentSu(name);
      },
      No: function () {
        haveGuest(name);
      }
    }
  });
}

function yourCommentSu(name) {
  $.confirm({
    title: "Your comment?",
    content:
      '<form action="" class="formName">' +
      '<div class="form-group">' +
      '<input type="text" placeholder="Comment" class="comment form-control" />' +
      '</div>' +
      '</form>',
    buttons: {
      formSubmit: {
        text: "Submit",
        btnClass: "btn-blue",
        action: function () {
          const comment = this.$content.find(".comment").val();
          document.getElementById("comments").value = comment || "";
          haveGuest(name);
        }
      },
      cancel: function () {
        haveGuest(name);
      }
    }
  });
}

function haveGuest() {
  $.confirm({
    title: "Do you have a guest?",
    content: "",
    buttons: {
      Yes: function () {
        showPage("pageGuest1");
      },
      No: function () {
        if (appData.price !== "") {
          showPage("pagePaypal");
        } else {
          closePayPal();
        }
      }
    }
  });
}

function haveAnotherGuest() {
  $.confirm({
    title: "Do you have another guest",
    content: "",
    buttons: {
      Yes: function () {
        const nGuests = document.getElementById("nGuests").value;
        if (nGuests == 1) showPage("pageGuest2");
        else if (nGuests == 2) showPage("pageGuest3");
        else if (nGuests == 3) showPage("pageGuest4");
        else if (nGuests == 4) maxGuests();
      },
      No: {
        btnClass: "btn-blue",
        action: function () {
          if (appData.price !== "") {
            showPage("pagePaypal");
          } else {
            closePayPal();
          }
        }
      }
    }
  });
}

function maxGuests() {
  $.confirm({
    title: "You have signed up 4 guests, please complete this signup and then sign in again if you want to add more guests",
    content: "",
    buttons: {
      Ok: function () {
        showPage("pagePaypal");
      }
    }
  });
}

function submitForm() {
  const thankName = members[document.getElementById("index").value]?.[1] || "Guest";
  document.getElementById("name2").innerText = thankName;
  console.log("Submit form payload:", {
    email: document.getElementById("email").value,
    comments: document.getElementById("comments").value,
    memMeal: document.getElementById("memMeal").value,
    nGuests: document.getElementById("nGuests").value
  });
}

window.addEventListener("load", initializeApp);
