# Notes App

A simple, elegant notes application built with vanilla HTML, CSS, and JavaScript. Create, edit, search, and manage your notes with a clean, responsive interface.

## Features

- **Create & Edit Notes**: Add new notes or edit existing ones with a rich text editor
- **Search Functionality**: Quickly find notes by searching through titles and content
- **Text Formatting**: Format your notes with bold, italic, and underline options
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: All notes are saved locally in your browser
- **Clean Interface**: Modern, minimalist design using Tailwind CSS

## Screenshots

### Main Notes List
- View all your notes in a clean, organized list
- Search through notes instantly
- Quick access to create new notes

### Note Editor
- Rich text editing with formatting tools
- Auto-save functionality
- Clean, distraction-free writing environment

### Note Viewer
- Read your notes in a formatted view
- Easy access to edit or delete options

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or additional software required

### Installation

1. **Download the files**:
   ```bash
   git clone <repository-url>
   # or download the ZIP file and extract
   ```

2. **File Structure**:
   ```
   notes-app/
   ├── index.html
   ├── styles.css
   ├── script.js
   └── README.md
   ```

3. **Run the application**:
   - Simply open `index.html` in your web browser
   - No build process or server setup required

## Usage

### Creating a Note
1. Click the "+" button in the top-right corner
2. Enter a title for your note
3. Write your content in the text area
4. Use the formatting buttons (B, I, U) to style selected text
5. Click "Save" to store your note

### Searching Notes
1. Use the search bar on the main screen
2. Type keywords to filter notes by title or content
3. Results update in real-time as you type

### Editing a Note
1. Click on any note from the main list to view it
2. Click the "Edit" button
3. Make your changes
4. Click "Save" to update

### Deleting a Note
1. Open the note you want to delete
2. Click the "Delete" button
3. Confirm the deletion in the popup dialog

## Technical Details

### Built With
- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling with Tailwind CSS framework
- **Vanilla JavaScript**: No external dependencies
- **Local Storage API**: For persistent data storage

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure

#### `index.html`
- Main HTML structure
- Links to external resources (fonts, Tailwind CSS)
- Application container element

#### `styles.css`
- Custom CSS styling
- Responsive design rules
- Accessibility enhancements
- Visual improvements

#### `script.js`
- Application logic and functionality
- Note management (CRUD operations)
- Search functionality
- Navigation between views
- Local storage handling

## Features in Detail

### Data Storage
- Notes are stored in the browser's Local Storage
- Each note contains: ID, title, content, and creation date
- Data persists between browser sessions
- No external database required

### Search Algorithm
- Real-time filtering as you type
- Searches both note titles and content
- Case-insensitive matching
- Instant results display

### Text Formatting
- **Bold**: `<b>` tags for emphasis
- **Italic**: `<i>` tags for styling
- **Underline**: `<u>` tags for highlighting
- Simple HTML-based formatting system

### Responsive Design
- Mobile-first approach
- Flexible layouts that adapt to screen size
- Touch-friendly interface elements
- Optimized for various devices

## Customization

### Styling
Modify `styles.css` to customize:
- Color scheme
- Typography
- Layout spacing
- Animation effects

### Functionality
Extend `script.js` to add:
- Export/import functionality
- Note categories or tags
- Rich text editing features
- Cloud synchronization

## Troubleshooting

### Notes Not Saving
- Ensure your browser supports Local Storage
- Check if you have sufficient storage space
- Try clearing browser cache and reload

### Search Not Working
- Verify JavaScript is enabled in your browser
- Check browser console for any error messages

### Formatting Issues
- Ensure you're selecting text before applying formatting
- Check that the textarea element is focused

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] Note categories and tags
- [ ] Export notes to various formats (PDF, TXT, etc.)
- [ ] Import notes from other applications
- [ ] Dark mode theme
- [ ] Cloud synchronization
- [ ] Collaborative editing
- [ ] Note templates
- [ ] Advanced search filters
- [ ] Keyboard shortcuts

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

## Changelog

### Version 1.0.0
- Initial release
- Basic note creation, editing, and deletion
- Search functionality
- Text formatting tools
- Responsive design
- Local storage integration

---

**Made with ❤️ using vanilla web technologies**
