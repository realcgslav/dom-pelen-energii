const Contact = () => `
    <h2>Kontakt</h2>
    <form>
      <label for="name">Imię:</label>
      <input type="text" id="name" name="name">
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
      
      <label for="message">Wiadomość:</label>
      <textarea id="message" name="message"></textarea>
      
      <button type="submit">Wyślij</button>
    </form>
`;

export default Contact;
