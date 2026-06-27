document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. PRELOADER DISMISSAL & LOGO FLY TRANSITION
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderLogo = document.querySelector('.preloader-logo');
  const headerLogo = document.querySelector('.header-logo');

  // Hide header logo initially so it can fade in during the transition
  if (headerLogo) {
    headerLogo.style.opacity = '0';
    headerLogo.style.transition = 'opacity 0.3s ease';
  }

  function dismissPreloader() {
    setTimeout(() => {
      if (preloaderLogo && headerLogo) {
        // 1. Get the current position and size of both logos
        const preloaderRect = preloaderLogo.getBoundingClientRect();
        const headerRect = headerLogo.getBoundingClientRect();

        // 2. Create a temporary clone logo for the transition
        const flyLogo = document.createElement('img');
        flyLogo.src = preloaderLogo.src;
        flyLogo.alt = "STORIE Logo Transition";
        flyLogo.style.position = 'fixed';
        flyLogo.style.top = `${preloaderRect.top}px`;
        flyLogo.style.left = `${preloaderRect.left}px`;
        flyLogo.style.width = `${preloaderRect.width}px`;
        flyLogo.style.height = `${preloaderRect.height}px`;
        flyLogo.style.zIndex = '10000';
        flyLogo.style.objectFit = 'contain';
        flyLogo.style.pointerEvents = 'none';
        flyLogo.style.transition = 'all 2.2s cubic-bezier(0.16, 1, 0.3, 1)';
        document.body.appendChild(flyLogo);

        // 3. Hide the static preloader logo
        preloaderLogo.style.opacity = '0';

        // 4. Start the preloader fade out (turns background transparent)
        preloader.classList.add('fade-out');

        // 5. In the next frame, animate the clone logo to the header logo's position
        requestAnimationFrame(() => {
          flyLogo.style.top = `${headerRect.top}px`;
          flyLogo.style.left = `${headerRect.left}px`;
          flyLogo.style.width = `${headerRect.width}px`;
          flyLogo.style.height = `${headerRect.height}px`;
        });

        // 6. Complete the transition: make header logo visible, clean up clone logo
        setTimeout(() => {
          headerLogo.style.opacity = '1';
          flyLogo.style.opacity = '0';
          setTimeout(() => {
            flyLogo.remove();
          }, 300);
          preloader.style.display = 'none';
          initScrollReveals();
        }, 2200); // matches the transition time (2.2s)
        
      } else {
        // Fallback if elements aren't found
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
          if (headerLogo) headerLogo.style.opacity = '1';
          initScrollReveals();
        }, 800);
      }
    }, 2200); // Allow preloader animation to show fully
  }

  if (preloader) {
    if (document.readyState === 'complete') {
      dismissPreloader();
    } else {
      window.addEventListener('load', dismissPreloader);
    }
  }

  /* ==========================================================================
     2. STICKY HEADER
     ========================================================================== */
  const mainHeader = document.getElementById('mainHeader');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     3. MOBILE NAVIGATION MENU
     ========================================================================== */
  const menuTrigger = document.getElementById('menuTrigger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileMenu() {
    menuTrigger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  }

  if (menuTrigger && mobileNav) {
    menuTrigger.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Delay slightly for visual feel before closing overlay
        setTimeout(toggleMobileMenu, 250);
      });
    });
  }

  /* ==========================================================================
     4. HERO PARALLAX EFFECT
     ========================================================================== */
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      // Smooth slow parallax translate
      heroBg.style.transform = `scale(1.05) translateY(${scrollPosition * 0.15}px)`;
    });
  }

  /* ==========================================================================
     5. PORTFOLIO FILTERING
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active Class
      filterButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all') {
          item.classList.add('show');
        } else {
          if (item.classList.contains(filterValue)) {
            item.classList.add('show');
          } else {
            item.classList.remove('show');
          }
        }
      });
    });
  });

  /* ==========================================================================
     6. PORTFOLIO DETAIL MODAL
     ========================================================================== */
  // Project Details Database
  const projectDatabase = {
    "1": {
      title: "Malabar Hill Penthouse",
      category: "Living Room",
      image: "assets/hero_living.png",
      description: "Located in the prestigious Malabar Hill neighborhood of Mumbai, this sea-facing penthouse is a masterclass in soft, tactile minimalism. We combined custom curved bouclé seating with neutral vein-cut Italian travertine surfaces, textured plaster walls, and warm ambient lighting. Bespoke champagne-gold brass accents capture the soft coastal breeze and sunlight streaming through double-height glass panes, creating an organic, sea-facing sanctuary.",
      location: "Mumbai, India",
      year: "2025",
      services: "Spatial Architecture, Bespoke Furniture, Art Curation & Styling"
    },
    "2": {
      title: "Lutyens' Villa Kitchen",
      category: "Culinary Space",
      image: "assets/portfolio_kitchen.png",
      description: "A clean, high-contrast culinary studio designed for a heritage villa in Lutyens' Delhi. Featuring a monolith Calacatta Gold marble kitchen island as the central focal point, we integrated custom fluted Indian teakwood cabinetry and hidden premium appliances. Brushed brass plumbing fixtures and concealed warm LED channels cast a golden warmth that mirrors the sunset over the capital.",
      location: "New Delhi, India",
      year: "2026",
      services: "Interior Design, Material Curation, Architectural Lighting & Millwork"
    },
    "3": {
      title: "Jubilee Hills Suite",
      category: "Sanctuary",
      image: "assets/portfolio_bedroom.png",
      description: "Designed as a personal retreat in Jubilee Hills, Hyderabad, this master bedroom suite centers around a custom floor-to-ceiling textured khadi silk headboard. The walls are finished in a hand-burnished clay plaster that adds raw texture and diffuses ambient lighting. Organic linen bedding, bespoke solid walnut bedside tables, and low-profile brushed brass reading lamps complete this peaceful environment.",
      location: "Hyderabad, India",
      year: "2025",
      services: "Interior Architecture, Bespoke Bedding Curation, Custom Furnishings"
    },
    "4": {
      title: "Bandra Sea-Facing Retreat",
      category: "Sanctuary / Bath",
      image: "assets/portfolio_bathroom.png",
      description: "A spa-inspired master bathroom finished in hand-selected vein-cut travertine stone slabs, overlooking the Arabian Sea in Bandra, Mumbai. The design features a massive freestanding solid stone bathtub positioned beneath a fluted glass window that lets in soft natural daylight. Minimalist gold plumbing lines contrast beautifully with the organic stonework, bringing a sense of warm hotel-luxury into the residential domain.",
      location: "Mumbai, India",
      year: "2025",
      services: "Spatial Layout, Bathroom Engineering, Fine Marble Selection & Installation"
    }
  };

  const portfolioModal = document.getElementById('portfolioModal');
  const modalImg = document.getElementById('modalImg');
  const modalCat = document.getElementById('modalCat');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLoc = document.getElementById('modalLoc');
  const modalYear = document.getElementById('modalYear');
  const modalServices = document.getElementById('modalServices');
  const modalClose = document.getElementById('modalClose');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  // Open Modal
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const projectId = item.getAttribute('data-id');
      const project = projectDatabase[projectId];

      if (project) {
        modalImg.src = project.image;
        modalImg.alt = project.title;
        modalCat.textContent = project.category;
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.description;
        modalLoc.textContent = project.location;
        modalYear.textContent = project.year;
        modalServices.textContent = project.services;

        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Modal
  function closeModal() {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (portfolioModal) {
    // Close on click outside content card
    portfolioModal.addEventListener('click', (e) => {
      if (e.target === portfolioModal) {
        closeModal();
      }
    });
  }

  // Pre-fill enquiry with modal project name when clicking modal CTA
  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      closeModal();
      const projectTitleText = modalTitle.textContent;
      const visionTextarea = document.getElementById('visionText');
      if (visionTextarea) {
        visionTextarea.value = `I am interested in your design style for "${projectTitleText}". I would love to explore a similar aesthetic for my space...`;
        visionTextarea.focus();
      }
    });
  }

  /* ==========================================================================
     7. DETAILED ENQUIRY FORM VALIDATION & SUCCESS STATE
     ========================================================================== */
  const enquiryForm = document.getElementById('enquiryForm');
  const successState = document.getElementById('successState');
  const btnSubmit = document.getElementById('btnSubmit');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validateForm()) {
        // Show Loading State on Button
        btnSubmit.classList.add('loading');

        // Simulate Premium API Call
        setTimeout(() => {
          btnSubmit.classList.remove('loading');
          
          // Populate Client details in Success State
          const nameInput = document.getElementById('fullName').value;
          const emailInput = document.getElementById('email').value;
          const typeSelect = document.getElementById('projectType');
          const typeText = typeSelect.options[typeSelect.selectedIndex].text;
          const budgetSelect = document.getElementById('budget');
          const budgetText = budgetSelect.options[budgetSelect.selectedIndex].text;
          const locationInput = document.getElementById('location').value;

          document.getElementById('clientName').textContent = nameInput;
          document.getElementById('clientEmail').textContent = emailInput;
          document.getElementById('summaryType').textContent = typeText;
          document.getElementById('summaryBudget').textContent = budgetText;
          document.getElementById('summaryLocation').textContent = locationInput;

          const floorPlanInput = document.getElementById('floorPlan');
          const summaryFile = document.getElementById('summaryFile');
          if (floorPlanInput && floorPlanInput.files.length > 0) {
            summaryFile.textContent = floorPlanInput.files[0].name;
          } else {
            summaryFile.textContent = "None attached";
          }

          // Transition View
          enquiryForm.style.display = 'none';
          successState.style.display = 'flex';
          
          // Scroll slightly to align success state in viewport
          const contactSection = document.getElementById('enquiry');
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }, 1800);
      }
    });

    // Reset Form button action
    const btnReset = document.getElementById('btnResetForm');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        enquiryForm.reset();
        
        // Clear file upload previews
        const btnRemoveFile = document.getElementById('btnRemoveFile');
        if (btnRemoveFile) btnRemoveFile.click();
        
        successState.style.display = 'none';
        enquiryForm.style.display = 'block';
        
        // Remove validation invalid styling
        const formGroups = enquiryForm.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('invalid'));
      });
    }

    // Input interaction: clear error highlights dynamically
    const inputs = enquiryForm.querySelectorAll('.form-input, input[type="radio"]');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('invalid');
      });

      input.addEventListener('change', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('invalid');
      });
    });
  }

  function validateForm() {
    let isValid = true;

    // Validate Full Name
    const fullName = document.getElementById('fullName');
    if (fullName.value.trim() === '') {
      setError(fullName);
      isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      setError(email);
      isValid = false;
    }

    // Validate Phone Number
    const phone = document.getElementById('phone');
    if (phone.value.trim().length < 8) {
      setError(phone);
      isValid = false;
    }

    // Validate Location
    const location = document.getElementById('location');
    if (location.value.trim() === '') {
      setError(location);
      isValid = false;
    }

    // Validate Project Type
    const projectType = document.getElementById('projectType');
    if (projectType.value === '') {
      setError(projectType);
      isValid = false;
    }

    // Validate Budget Range
    const budget = document.getElementById('budget');
    if (budget.value === '') {
      setError(budget);
      isValid = false;
    }

    // Validate Radio button selection for Timeline
    const timelineRadios = document.getElementsByName('timeline');
    let timelineSelected = false;
    timelineRadios.forEach(radio => {
      if (radio.checked) timelineSelected = true;
    });

    if (!timelineSelected) {
      const timelineGroup = timelineRadios[0].closest('.form-group');
      if (timelineGroup) timelineGroup.classList.add('invalid');
      isValid = false;
    }

    // Validate Vision details
    const visionText = document.getElementById('visionText');
    if (visionText.value.trim().length < 10) {
      setError(visionText);
      isValid = false;
    }

    return isValid;
  }

  function setError(inputElement) {
    const group = inputElement.closest('.form-group');
    if (group) {
      group.classList.add('invalid');
    }
  }

  /* ==========================================================================
     7.5 FLOOR PLAN FILE UPLOAD HANDLERS
     ========================================================================== */
  const floorPlan = document.getElementById('floorPlan');
  const fileUploadTrigger = document.getElementById('fileUploadTrigger');
  const filePreview = document.getElementById('filePreview');
  const fileName = document.getElementById('fileName');
  const fileIcon = document.getElementById('fileIcon');
  const btnRemoveFile = document.getElementById('btnRemoveFile');

  if (fileUploadTrigger && floorPlan) {
    // Click triggers file selector
    fileUploadTrigger.addEventListener('click', () => {
      floorPlan.click();
    });

    // Handle file selection
    floorPlan.addEventListener('change', (e) => {
      if (floorPlan.files.length > 0) {
        const file = floorPlan.files[0];
        fileName.textContent = file.name;

        // Determine icon based on file extension
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (ext === '.pdf') {
          fileIcon.className = 'fa-solid fa-file-pdf text-gold';
        } else if (ext === '.dwg' || ext === '.dxf') {
          fileIcon.className = 'fa-solid fa-file-signature text-gold';
        } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          fileIcon.className = 'fa-solid fa-file-image text-gold';
        } else if (ext === '.zip' || ext === '.rar') {
          fileIcon.className = 'fa-solid fa-file-zipper text-gold';
        } else {
          fileIcon.className = 'fa-solid fa-file text-gold';
        }

        // Display preview, hide trigger
        fileUploadTrigger.style.display = 'none';
        filePreview.style.display = 'flex';
      }
    });

    // Remove selected file
    if (btnRemoveFile) {
      btnRemoveFile.addEventListener('click', (e) => {
        e.stopPropagation(); // Avoid triggering trigger click
        floorPlan.value = '';
        filePreview.style.display = 'none';
        fileUploadTrigger.style.display = 'flex';
      });
    }

    // Drag and Drop support
    ['dragenter', 'dragover'].forEach(eventName => {
      fileUploadTrigger.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileUploadTrigger.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      fileUploadTrigger.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileUploadTrigger.classList.remove('dragover');
      }, false);
    });

    fileUploadTrigger.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        floorPlan.files = files;
        // Trigger change event to fire preview logic
        const event = new Event('change');
        floorPlan.dispatchEvent(event);
      }
    }, false);
  }

  /* ==========================================================================
     8. SCROLL INTERSECTION OBSERVER ANIMATIONS
     ========================================================================== */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Fallback reveal in case preloader fails or takes too long to load
  setTimeout(() => {
    const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    const firstReveal = reveals[0];
    if (firstReveal && !firstReveal.classList.contains('active')) {
      initScrollReveals();
    }
  }, 4000);
  
});
