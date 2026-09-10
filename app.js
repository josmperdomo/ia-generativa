/**
 * GenAI Hub - Single Page Application Script
 * Desarrollado con JavaScript puro (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  initToasts();
  initNavigation();
  initSimulator();
  initAppFilters();
  initMockActions();
  initScrollHeader();
});

/* ==========================================================================
   1. Sistema de Notificaciones Flotantes (Toasts)
   ========================================================================== */
let toastContainer;

function initToasts() {
  toastContainer = document.getElementById('toast-container');
}

/**
 * Muestra una notificación emergente visual elegante en la esquina inferior.
 * @param {string} title - Título del toast
 * @param {string} message - Mensaje explicativo
 * @param {number} duration - Duración en milisegundos (default: 4000ms)
 */
function showToast(title, message, duration = 4200) {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Cerrar">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  const removeToast = () => {
    toast.classList.add('removing');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  };

  closeBtn.addEventListener('click', removeToast);
  toastContainer.appendChild(toast);

  setTimeout(removeToast, duration);
}

/* ==========================================================================
   2. Navegación en Página Única (Smooth Scroll & Menú Móvil)
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link, .brand-logo, a[href^="#"]');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // Smooth scroll sin recarga de página ni salto brusco
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        
        if (mainNav && mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
        }

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const headerOffset = 70;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Actualizar estado activo en la barra de navegación
          document.querySelectorAll('.nav-link').forEach(nl => nl.classList.remove('active'));
          if (link.classList.contains('nav-link')) {
            link.classList.add('active');
          }
        }
      }
    });
  });
}

function initScrollHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. Interceptación de Botones Mock (No navegan a ninguna parte)
   ========================================================================== */
function initMockActions() {
  // Lista de identificadores de botones interactivos mock
  const mockButtonConfigs = [
    { id: 'btn-login', title: 'Acceso de Usuarios', msg: 'Demostración: Este sitio es una página única informativa. El botón de acceso no redirige.' },
    { id: 'btn-login-mobile', title: 'Acceso de Usuarios', msg: 'Demostración: Este sitio es una página única informativa. El botón de acceso no redirige.' },
    { id: 'btn-register', title: 'Registro de Cuenta', msg: 'Demostración: Las suscripciones y registros están desactivados en esta página.' },
    { id: 'btn-register-mobile', title: 'Registro de Cuenta', msg: 'Demostración: Las suscripciones y registros están desactivados en esta página.' },
    { id: 'btn-whitepaper', title: 'Descarga de Documentación', msg: 'Has solicitado el Whitepaper: "Fundamentos y Estado del Arte de la IA Generativa" (Simulación).' },
    { id: 'btn-details-trad', title: 'IA Discriminativa', msg: 'Explorando arquitectura supervisada clásica (SVMs, Árboles y Regresiones en memoria).' },
    { id: 'btn-details-gen', title: 'IA Generativa', msg: 'Los modelos fundacionales permiten transfer learning universal a través de prompting.' },
    { id: 'btn-model-llm', title: 'Mecanismo de Auto-Atención', msg: 'Query, Key, Value: Los LLMs calculan pesos de relevancia cruzada para predecir el próximo token.' },
    { id: 'btn-model-diff', title: 'Ecuaciones Diferenciales Estocásticas', msg: 'Los modelos de difusión aprenden el proceso inverso de dispersión browniana de calor/ruido.' },
    { id: 'btn-model-gan', title: 'Entrenamiento Adversario', msg: 'Min-Max Loss: Equilibrio de Nash alcanzado entre red discriminadora y generadora.' },
    { id: 'btn-model-multi', title: 'Codificadores Multimodales', msg: 'Alineación de espacios de incrustación (Embeddings) de texto e imagen mediante CLIP.' },
    { id: 'btn-metric-1', title: 'Concepto LLM', msg: 'Large Language Models preentrenados con billones de parámetros.' },
    { id: 'btn-metric-2', title: 'Arquitectura Transformer', msg: 'Introducida por Vaswani et al. en 2017 ("Attention Is All You Need").' },
    { id: 'btn-metric-3', title: 'Latent Diffusion', msg: 'Compresión perceptual mediante VAEs antes de aplicar difusión en espacio latente.' },
    { id: 'btn-metric-4', title: 'RAG', msg: 'Retrieval-Augmented Generation: conexión en tiempo real con bases de datos vectoriales.' }
  ];

  mockButtonConfigs.forEach(({ id, title, msg }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showToast(title, msg);
      });
    }
  });

  // Interceptor global para cualquier otro botón o enlace no mapeado explícitamente
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, a');
    if (!btn) return;

    // Ignorar si es un enlace con ancla interna a una sección existente (#...)
    const href = btn.getAttribute('href');
    if (href && href.startsWith('#')) return;

    // Ignorar botones con lógica propia controlada
    if (btn.classList.contains('preset-btn') || 
        btn.classList.contains('filter-btn') || 
        btn.classList.contains('toast-close') ||
        btn.id === 'btn-generate-ai' || 
        btn.id === 'btn-copy-output' || 
        btn.id === 'mobile-toggle') {
      return;
    }

    // Prevenir cualquier navegación externa accidental
    e.preventDefault();
    const btnText = btn.innerText ? btn.innerText.trim() : 'Acción';
    showToast(btnText || 'Acción Interactiva', 'Demostración: Enlace interactivo en página única. No redirige por diseño.');
  });

  // Botones del Footer
  const footerMockButtons = document.querySelectorAll('.footer-mock-btn');
  footerMockButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = btn.textContent.trim();
      showToast(text, `Has interactuado con "${text}". Enlace informativo inactivo por diseño de página única.`);
    });
  });

  // Formulario de Newsletter
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput ? emailInput.value : '';
      showToast('Suscripción Registrada (Simulada)', `¡Gracias por tu interés (${email})! Este formulario es una demostración en página única.`);
      if (emailInput) emailInput.value = '';
    });
  }
}

/* ==========================================================================
   4. Simulador Interactivo de Generación de Prompts
   ========================================================================== */
function initSimulator() {
  const promptInput = document.getElementById('prompt-input');
  const tempSlider = document.getElementById('temp-slider');
  const tempVal = document.getElementById('temp-val');
  const charCount = document.getElementById('char-count');
  const generateBtn = document.getElementById('btn-generate-ai');
  const outputBox = document.getElementById('sim-output-text');
  const statusBadge = document.getElementById('sim-status');
  const statLatency = document.getElementById('stat-latency');
  const statTokens = document.getElementById('stat-tokens');
  const copyBtn = document.getElementById('btn-copy-output');
  const presetButtons = document.querySelectorAll('.preset-btn');

  // Plantillas con respuestas generadas enriquecidas
  const presets = {
    explain: {
      prompt: "¿Qué es la Inteligencia Artificial Generativa y en qué se diferencia del Machine Learning tradicional?",
      response: `La Inteligencia Artificial Generativa (GenAI) es un subconjunto avanzado del aprendizaje profundo diseñado específicamente para crear contenido nuevo y original —incluyendo prosa literaria, código fuente, audio de alta fidelidad, videos e imágenes fotorrealistas— que imita las características estadísticas de los datos con los que fue entrenada.

Diferencias Fundamentales:
1. Objetivo:
   • IA Tradicional: Discrimina o clasifica (ej. "Este correo es Spam vs No Spam").
   • IA Generativa: Sintetiza y formula (ej. "Redacta un correo persuasivo para una propuesta comercial").

2. Representación del Conocimiento:
   • Opera proyectando conceptos en espacios latentes de alta dimensión y predice secuencias coherentes mediante mecanismos de atención contextual.

3. Versatilidad:
   • Un solo modelo fundacional puede resolver cientos de tareas distintas sin necesidad de reentrenamiento específico, únicamente variando el prompt de entrada.`
    },
    code: {
      prompt: "Escribe una función en Python con tipado estricto para calcular la similitud coseno entre dos embeddings vectoriales de IA.",
      response: `import numpy as np
from typing import Sequence, Union

def cosine_similarity(
    vector_a: Union[np.ndarray, Sequence[float]], 
    vector_b: Union[np.ndarray, Sequence[float]]
) -> float:
    """
    Calcula la similitud coseno entre dos representaciones vectoriales (embeddings).
    
    Parámetros:
        vector_a: Primer vector de embedding numérico.
        vector_b: Segundo vector de embedding numérico.
        
    Retorna:
        Valor escalar entre -1.0 y 1.0 indicando la afinidad semántica.
    """
    a = np.asarray(vector_a, dtype=np.float32)
    b = np.asarray(vector_b, dtype=np.float32)
    
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    
    if norm_a == 0.0 or norm_b == 0.0:
        raise ValueError("No se puede calcular similitud para un vector nulo.")
        
    return float(np.dot(a, b) / (norm_a * norm_b))

# Ejemplo de uso:
# sim = cosine_similarity([0.15, 0.82, -0.4], [0.12, 0.79, -0.38])
# print(f"Afinidad semántica: {sim:.4f}")`
    },
    creative: {
      prompt: "Actúa como Diseñador UI/UX Senior y describe un concepto de interfaz moderna para un copilot de programación.",
      response: `Concepto de Interfaz: 'OmniCode Copilot - Workspace 2026'

1. Filosofía de Diseño:
   • Zero-Distraction: Una barra lateral semitransparente con desenfoque de fondo (backdrop-blur de 20px) que emerge sólo bajo demanda táctil o atajo contextual (Ctrl + Espacio).
   • Paleta cromática: Base azul marino (#0B2545) con detalles en azul vibrante (#0A66C2) y acentos en esmeralda (#057642) para comprobaciones de código exitosas.

2. Componentes Clave:
   • Diff en Tiempo Real: Muestra inserciones en verde sutil y refactorizaciones con un degradado animado antes de aplicar los cambios con un clic.
   • Explicador de Complejidad: Chip superior que indica la notación Big-O calculada (ej. 'O(n log n) - Óptimo').
   • Barra de Intención Dinámica: Input flotante centrado que autocompleta nombres de funciones basándose en el historial de git local.`
    },
    rag: {
      prompt: "¿Cómo funciona una arquitectura RAG (Retrieval-Augmented Generation) paso a paso?",
      response: `Flujo Arquitectónico de RAG (Retrieval-Augmented Generation):

1. Fase de Ingesta e Indexación:
   • Los documentos corporativos (PDFs, wikis, bases de datos) se dividen en fragmentos (chunks) con solapamiento semántico.
   • Un modelo de Embedding convierte cada chunk en un vector matemático y lo almacena en una base de datos vectorial (ej. Milvus, Pinecone, Chroma).

2. Fase de Recuperación (Retrieval):
   • Cuando el usuario formula una pregunta, su consulta es vectorizada.
   • Se realiza una búsqueda por similitud de coseno para extraer los 3 a 5 fragmentos más pertinentes de la base de conocimiento interna.

3. Fase de Aumentación y Generación:
   • Se ensambla un meta-prompt: "Contexto factual recuperado: [Chunks] + Pregunta del usuario: [Consulta]".
   • El LLM procesa esta entrada enriquecida, produciendo una respuesta certera, fundamentada y libre de alucinaciones.`
    }
  };

  // Cargar preset inicial
  if (promptInput) {
    promptInput.value = presets.explain.prompt;
    updateCharCount();
  }

  function updateCharCount() {
    if (charCount && promptInput) {
      charCount.textContent = `${promptInput.value.length} caracteres`;
    }
  }

  if (promptInput) {
    promptInput.addEventListener('input', updateCharCount);
  }

  // Slider de Temperatura
  if (tempSlider && tempVal) {
    tempSlider.addEventListener('input', (e) => {
      tempVal.textContent = parseFloat(e.target.value).toFixed(1);
    });
  }

  // Presets
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const presetKey = btn.dataset.preset;
      if (presets[presetKey] && promptInput) {
        promptInput.value = presets[presetKey].prompt;
        updateCharCount();
        executeGeneration(presets[presetKey].response);
      }
    });
  });

  // Botón Generar
  let isGenerating = false;
  let typingInterval = null;

  function executeGeneration(targetText = null) {
    if (isGenerating) return;
    isGenerating = true;

    if (typingInterval) clearInterval(typingInterval);

    statusBadge.textContent = 'Generando...';
    statusBadge.classList.add('generating');
    outputBox.textContent = '';

    const startTime = performance.now();
    
    // Si no se proporcionó texto de un preset, generar una respuesta sintética inteligente
    const promptValue = promptInput.value.trim();
    let responseToStream = targetText;

    if (!responseToStream) {
      responseToStream = `Analizando tu consulta: "${promptValue}"\n\nRespuesta Generada por el Modelo Fundacional:\nLa inteligencia artificial generativa sintetiza esta respuesta evaluando los pesos semánticos de tu instrucción. La temperatura seleccionada (${tempVal.textContent}) permite un equilibrio armónico entre precisión fáctica y variabilidad creativa.\n\nRecomendación de ingeniería de prompts: Incluye siempre contexto de rol, restricciones de formato y ejemplos de pocos tiros (few-shot) para maximizar la calidad de los resultados.`;
    }

    let charIndex = 0;
    const streamSpeed = 12; // ms por carácter

    typingInterval = setInterval(() => {
      if (charIndex < responseToStream.length) {
        outputBox.textContent += responseToStream.charAt(charIndex);
        charIndex++;
        outputBox.scrollTop = outputBox.scrollHeight;
        
        // Tokens calculados aproximados (1 token ~ 4 caracteres)
        if (statTokens) {
          statTokens.textContent = Math.round(charIndex / 4);
        }
      } else {
        clearInterval(typingInterval);
        isGenerating = false;
        statusBadge.textContent = 'Completado';
        statusBadge.classList.remove('generating');

        const elapsed = Math.round(performance.now() - startTime);
        if (statLatency) {
          statLatency.textContent = `${elapsed} ms`;
        }
      }
    }, streamSpeed);
  }

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      executeGeneration();
    });
  }

  // Copiar al Portapapeles
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = outputBox.textContent;
      if (textToCopy && textToCopy.trim().length > 0) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Portapapeles', 'El contenido generado ha sido copiado exitosamente.');
        }).catch(() => {
          showToast('Portapapeles', 'Contenido seleccionado para copia manual.');
        });
      }
    });
  }
}

/* ==========================================================================
   5. Filtros Interactivos de Aplicaciones
   ========================================================================== */
function initAppFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const appCards = document.querySelectorAll('.app-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      appCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
