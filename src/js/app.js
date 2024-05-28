import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';

import Home from './components/Home';
import About from './components/About';
import Gallery from './components/Gallery';
import TechnicalSpecifications from './components/TechnicalSpecifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Nav from './components/Nav';

const render = (component, target) => {
    document.querySelector(target).innerHTML = component();
};

const initEditor = (element) => {
    const content = element.innerHTML.replace('<span class="edit-icon">+</span>', '');
    element.innerHTML = `<div class="editor">${content}</div><button class="save-btn">Save</button>`;
    const editorDiv = element.querySelector('.editor');

    InlineEditor
        .create(editorDiv, {
            plugins: [ Essentials, Bold, Italic, Heading, Markdown ],
            toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' ],
            heading: {
                options: [
                    { model: 'paragraph', view: 'p', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                ]
            }
        })
        .then(editor => {
            element.querySelector('.save-btn').addEventListener('click', () => {
                const data = editor.getData();
                editor.destroy().then(() => {
                    element.innerHTML = data + '<span class="edit-icon">+</span>';
                    attachEditIcon(element);
                });
            });
        })
        .catch(error => {
            console.error(error);
        });
};

const attachEditIcon = (element) => {
    const existingIcon = element.querySelector('.edit-icon');
    if (existingIcon) {
        existingIcon.remove();
    }

    const editIcon = document.createElement('span');
    editIcon.className = 'edit-icon';
    editIcon.textContent = '+';
    element.appendChild(editIcon);
    editIcon.addEventListener('click', () => initEditor(element));
};

const attachEditIcons = () => {
    document.querySelectorAll('p, h1, h2, div.edit').forEach(element => {
        if (!element.querySelector('.edit-icon')) {
            attachEditIcon(element);
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    render(Nav, '#nav');
    render(Home, '#home');
    render(About, '#about');
    render(Gallery, '#gallery');
    render(TechnicalSpecifications, '#technical-specifications');
    render(Testimonials, '#testimonials');
    render(Contact, '#contact');
    attachEditIcons();
});
