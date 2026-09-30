let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function addContact() {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message");

    if (name === "" || phone === "" || email === "") {
        message.textContent = "Please fill all fields.";
        return;
    }

    const contact = {
        id: Date.now(),
        name: name,
        phone: phone,
        email: email
    };

    contacts.push(contact);

    saveContacts();

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";

    message.textContent = "Contact added successfully!";

    displayContacts(contacts);
}

function deleteContact(id) {

    contacts = contacts.filter(contact => contact.id !== id);

    saveContacts();

    displayContacts(contacts);
}

function searchContacts() {

    const searchValue =
        document.getElementById("search").value.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchValue)
    );

    displayContacts(filteredContacts);
}

function displayContacts(list) {

    const container = document.getElementById("contacts");
    const count = document.getElementById("contactCount");

    count.textContent =
        `${contacts.length} ${contacts.length === 1 ? "Contact" : "Contacts"}`;

    if (list.length === 0) {

        container.innerHTML = `
            <div class="empty">
                No contacts found.
            </div>
        `;

        return;
    }

    container.innerHTML = list.map(contact => {

        const initial = contact.name.charAt(0).toUpperCase();

        return `
            <div class="contact">

                <div class="contact-info">

                    <div class="avatar">
                        ${initial}
                    </div>

                    <div>
                        <h3>${escapeHTML(contact.name)}</h3>
                        <p>📞 ${escapeHTML(contact.phone)}</p>
                        <p>✉️ ${escapeHTML(contact.email)}</p>
                    </div>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteContact(${contact.id})">
                    Delete
                </button>

            </div>
        `;

    }).join("");
}

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}

displayContacts(contacts);