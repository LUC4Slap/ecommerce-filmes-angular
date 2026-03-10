import { Component, OnInit, signal, PLATFORM_ID, inject, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BuscarFilmes } from '../../services/buscar-filmes';
import { Filme } from '../../interfaces/filme.interface';
import { CardFilme } from '../card-filme/card-filme';
import { Slide } from '../../interfaces/slide.interface';

@Component({
  selector: 'app-home',
  imports: [CardFilme],
  templateUrl: './home.html',
  styleUrl: './home.sass'
})
export class Home implements OnInit, AfterViewInit {
  filmes = signal<Filme[]>([]);
  slides = signal<Slide[]>([]);
  private platformId = inject(PLATFORM_ID);
  
  constructor(private buscarFilmes: BuscarFilmes){}

  ngOnInit(): void {
    console.log('Home component initialized');
    this.buscarFilmesDb();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Aguardar um pouco para garantir que os slides foram renderizados
      setTimeout(() => {
        this.initCarousel();
      }, 100);
    }
  }

  buscarFilmesDb() {
    this.buscarFilmes.buscarFilmes().subscribe((filmes: Filme[]) => {
      this.filmes.set(filmes);
      if(this.filmes().length > 0) {
        this.gerarSlide();
      }
    });
  }

  gerarSlide() {
    let slides: Slide[] = [];
    slides = this.filmes().map((filme: Filme) => ({
      id: filme.id,
      image: filme.image
    }))
    
    this.slides.set(slides);
    
    // Inicializar carousel após os slides serem renderizados
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initCarousel();
      }, 100);
    }
  }

  initCarousel() {
    const carouselElement = document.getElementById('carouselExampleControls');
    
    if (!carouselElement) {
      console.error('Carousel element not found');
      return;
    }

    // Verificar se h\u00e1 itens no carousel
    const items = carouselElement.querySelectorAll('.carousel-item');
    if (items.length === 0) {
      console.error('No carousel items found');
      return;
    }

    // Verificar se Bootstrap est\u00e1 dispon\u00edvel
    if (!(window as any).bootstrap?.Carousel) {
      console.error('Bootstrap not loaded yet, retrying...');
      setTimeout(() => this.initCarousel(), 200);
      return;
    }

    try {
      // Destruir inst\u00e2ncia anterior se existir
      const oldInstance = (window as any).bootstrap.Carousel.getInstance(carouselElement);
      if (oldInstance) {
        oldInstance.dispose();
      }
      
      // Criar nova inst\u00e2ncia
      const carousel = new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 3000,
        wrap: true,
        ride: 'carousel',
        keyboard: true
      });
      
      console.log('Carousel initialized successfully with', items.length, 'items');
    } catch (error) {
      console.error('Error initializing carousel:', error);
    }
  }

}
