import { showView } from "../show-view.js";

export function getFooter () {
    const footerElement = document.createElement('footer');
    footerElement.className = 'page-footer font-small';
    footerElement.innerHTML = `
        <div class="footer-copyright text-center py-3">
            &copy; 2025
            <a href="/" class="text-dark">JS Applications</a>
        </div>
    `;

    footerElement.querySelectorAll('a').forEach(link => {
        if (!link.href || link.href === 'javascript:void(0)') return;
        
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const linkURL = new URL(link.href);
            showView(linkURL);
        });
    });
    
    return footerElement;
}