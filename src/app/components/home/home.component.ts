import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';  // Importer le DataService
import { Category, Theme, Card } from '../../models';
import {NgForOf} from '@angular/common';  // Importer les modèles

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];

  constructor(private dataService: DataService) {}

  // Récupérer les catégories au moment où le composant est initialisé
  ngOnInit(): void {
    this.dataService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Fonction pour réviser les cartes d'un thème
  useCards(cards: Card[]) {
    if (cards.length === 0) {
      alert('Aucune carte disponible pour ce thème.');
      return;
    }

    let reviewMessage = 'Révision du thème :\n';
    cards.forEach((card, index) => {
      reviewMessage += `\nQ${index + 1}: ${card.question}`;
    });

    alert(reviewMessage);
  }
}
