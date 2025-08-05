// Note data structure: { id: string, title: string, content: string, date: string }
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentNoteId = null;
let searchQuery = ''; // Initialize searchQuery as empty string

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Format date as "Month Day, Year"
function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Render List View
function renderListView() {
  // Use the global searchQuery variable for filtering
  const filteredNotes = notes.filter(
    note => (note.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
            (note.content || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  document.getElementById('app').innerHTML = `
    <div>
      <div class="flex items-center bg-slate-50 p-4 pb-2 justify-between">
        <h2 class="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">Notes</h2>
        <div class="flex w-12 items-center justify-end">
          <button onclick="navigate('create')"
            class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-[#0e141b] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
          >
            <div class="text-[#0e141b]" data-icon="Plus" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div class="px-4 py-3">
        <label class="flex flex-col min-w-40 h-12 w-full">
          <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div
              class="text-[#4e7097] flex border-none bg-[#e7edf3] items-center justify-center pl-4 rounded-l-lg border-r-0"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              id="search-input"
              placeholder="Search notes"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border-none bg-[#e7edf3] focus:border-none h-full placeholder:text-[#4e7097] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value="${searchQuery}"
            />
          </div>
        </label>
      </div>
      <h3 class="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">All Notes</h3>
      ${filteredNotes
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(
          note => `
          <div class="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 cursor-pointer" onclick="navigate('view', '${note.id}')">
            <div class="text-[#0e141b] flex items-center justify-center rounded-lg bg-[#e7edf3] shrink-0 size-12" data-icon="Note" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"
                ></path>
              </svg>
            </div>
            <div class="flex flex-col justify-center">
              <p class="text-[#0e141b] text-base font-medium leading-normal line-clamp-1">${note.title || 'Untitled'}</p>
              <p class="text-[#4e7097] text-sm font-normal leading-normal line-clamp-2">${formatDate(new Date(note.date))}</p>
            </div>
          </div>
        `
        )
        .join('')}
    </div>
  `;

  // Attach search event listener after rendering
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value || '';
      renderListView();
    });
  }
}

// Render Create/Edit View
function renderCreateEditView(noteId = null) {
  const note = noteId ? notes.find(n => n.id === noteId) : { title: '', content: '' };
  currentNoteId = noteId;

  return `
    <div>
      <div class="flex items-center bg-slate-50 p-4 pb-2 justify-between">
        <div class="text-[#0e141b] flex size-12 shrink-0 items-center cursor-pointer" data-icon="ArrowLeft" data-size="24px" data-weight="regular" onclick="navigate('list')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </div>
        <div class="flex w-12 items-center justify-end">
          <p class="text-[#4e7097] text-base font-bold leading-normal tracking-[0.015em] shrink-0 cursor-pointer" onclick="saveNote()">Save</p>
        </div>
      </div>
      <div class="flex w-full flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1 w-full">
          <input
            id="note-title"
            placeholder="Title"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border-none bg-[#e7edf3] focus:border-none h-14 placeholder:text-[#4e7097] p-4 text-base font-normal leading-normal"
            value="${note.title || ''}"
          />
        </label>
      </div>
      <div class="flex w-full flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1 w-full">
          <textarea
            id="note-content"
            placeholder="Start writing..."
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border-none bg-[#e7edf3] focus:border-none min-h-36 placeholder:text-[#4e7097] p-4 text-base font-normal leading-normal"
          >${note.content || ''}</textarea>
        </label>
      </div>
      <div class="flex justify-between gap-2 px-4 py-3">
        <div class="flex gap-2">
          <button class="p-2 text-[#0e141b]" onclick="formatText('bold')">
            <div class="text-[#0e141b]" data-icon="TextB" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M170.48,115.7A44,44,0,0,0,140,40H72a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM80,56h60a28,28,0,0,1,0,56H80Zm72,136H80V128h72a32,32,0,0,1,0,64Z"
                ></path>
              </svg>
            </div>
          </button>
          <button class="p-2 text-[#0e141b]" onclick="formatText('italic')">
            <div class="text-[#0e141b]" data-icon="TextItalic" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M200,56a8,8,0,0,1-8,8H157.77L115.1,192H144a8,8,0,0,1,0,16H64a8,8,0,0,1,0-16H98.23L140.9,64H112a8,8,0,0,1,0-16h80A8,8,0,0,1,200,56Z"></path>
              </svg>
            </div>
          </button>
          <button class="p-2 text-[#0e141b]" onclick="formatText('underline')">
            <div class="text-[#0e141b]" data-icon="TextUnderline" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M200,224a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,224Zm-72-24a64.07,64.07,0,0,0,64-64V56a8,8,0,0,0-16,0v80a48,48,0,0,1-96,0V56a8,8,0,0,0-16,0v80A64.07,64.07,0,0,0,128,200Z"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render View Page
function renderViewPage(noteId) {
  const note = notes.find(n => n.id === noteId);
  if (!note) return navigate('list');

  return `
    <div>
      <div class="flex items-center bg-slate-50 p-4 pb-2 justify-between">
        <div class="text-[#0e141b] flex size-12 shrink-0 items-center cursor-pointer" data-icon="ArrowLeft" data-size="24px" data-weight="regular" onclick="navigate('list')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </div>
        <h2 class="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Note</h2>
      </div>
      <h1 class="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">${note.title || 'Untitled'}</h1>
      <p class="text-[#0e141b] text-base font-normal leading-normal pb-3 pt-1 px-4">${note.content}</p>
    </div>
    <div>
      <div class="flex justify-center gap-4 px-4 py-2.5">
        <div class="flex flex-col items-center gap-2 bg-slate-50 text-center">
          <div class="rounded-full bg-[#e7edf3] p-2.5 cursor-pointer" onclick="navigate('edit', '${note.id}')">
            <div class="text-[#0e141b]" data-icon="PencilSimple" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"
                ></path>
              </svg>
            </div>
          </div>
          <p class="text-[#0e141b] text-sm font-medium leading-normal">Edit</p>
        </div>
        <div class="flex flex-col items-center gap-2 bg-slate-50 text-center">
          <div class="rounded-full bg-[#e7edf3] p-2.5 cursor-pointer" onclick="deleteNote('${note.id}')">
            <div class="text-[#0e141b]" data-icon="Trash" data-size="20px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
                ></path>
              </svg>
            </div>
          </div>
          <p class="text-[#0e141b] text-sm font-medium leading-normal">Delete</p>
        </div>
      </div>
    </div>
  `;
}

// Navigation function
function navigate(page, noteId = null) {
  searchQuery = ''; // Reset search query on navigation
  const app = document.getElementById('app');
  if (page === 'list') {
    renderListView();
  } else if (page === 'create' || page === 'edit') {
    app.innerHTML = renderCreateEditView(noteId);
  } else if (page === 'view') {
    app.innerHTML = renderViewPage(noteId);
  }
}

// Save or update a note
function saveNote() {
  const title = document.getElementById('note-title')?.value || '';
  const content = document.getElementById('note-content')?.value || '';

  if (currentNoteId) {
    // Update existing note
    const note = notes.find(n => n.id === currentNoteId);
    note.title = title;
    note.content = content;
    note.date = new Date().toISOString();
  } else {
    // Create new note
    notes.push({
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString(),
    });
  }
  saveNotes();
  navigate('list');
}

// Delete a note
function deleteNote(noteId) {
  if (confirm('Are you sure you want to delete this note?')) {
    notes = notes.filter(n => n.id !== noteId);
    saveNotes();
    navigate('list');
  }
}

// Format text in textarea
function formatText(type) {
  const textarea = document.getElementById('note-content');
  if (!textarea) return;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  if (!selectedText) return;

  let tag;
  if (type === 'bold') tag = 'b';
  else if (type === 'italic') tag = 'i';
  else if (type === 'underline') tag = 'u';

  const newText = `<${tag}>${selectedText}</${tag}>`;
  textarea.value = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
  
  // Set cursor position after the inserted text
  const newCursorPos = start + newText.length;
  textarea.setSelectionRange(newCursorPos, newCursorPos);
  textarea.focus();
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  navigate('list');
});

// Initialize app immediately if DOM is already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    navigate('list');
  });
} else {
  navigate('list');
}
