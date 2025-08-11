import { mostrarSoluciones } from '../app_buscador';

describe('mostrarSoluciones', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul id="solutionList"></ul>
      <div id="imageModal" style="display:none">
        <span class="close">x</span>
        <img id="imgModal" />
        <div id="caption"></div>
      </div>
    `;
  });

  test('agrega pasos e imágenes', () => {
    const errorData = {
      Solucion: ['Paso 1', 'Paso 2'],
      Imagenes: [
        { Posicion: 1, URL: 'http://example.com/img1.jpg' },
        { Posicion: 2, URL: 'http://example.com/img2.jpg' }
      ]
    };

    mostrarSoluciones(errorData);

    const items = document.querySelectorAll('#solutionList li');
    expect(items.length).toBe(4);
    expect(items[0].textContent).toBe('Paso 1');
    expect(items[1].querySelector('img').src).toBe('http://example.com/img1.jpg');
    expect(items[2].textContent).toBe('Paso 2');
    expect(items[3].querySelector('img').src).toBe('http://example.com/img2.jpg');
  });

  test('cerrar modal oculta el contenedor', () => {
    const errorData = { Solucion: ['Paso único'], Imagenes: [] };
    mostrarSoluciones(errorData);

    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');

    modal.style.display = 'block';
    closeBtn.click();

    expect(modal.style.display).toBe('none');
  });
});
