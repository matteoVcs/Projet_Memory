import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Category, Theme, Card } from '../../models';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  isReviewing = false;
  currentTheme: Theme | null = null;
  currentCardIndex = 0;
  userAnswer = '';
  answerChecked = false;
  isCorrect = false;
  themeNeedsReview = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  startReview(theme: Theme) {
    this.currentTheme = theme;
    this.currentCardIndex = 0;
    this.isReviewing = true;
    this.themeNeedsReview = false;
    this.userAnswer = '';
    this.answerChecked = false;
    this.isCorrect = false;
  }

  stopReview() {
    this.isReviewing = false;
    this.currentTheme = null;
    this.currentCardIndex = 0;
    this.userAnswer = '';
    this.answerChecked = false;
    this.isCorrect = false;
    this.themeNeedsReview = false;
  }

  finishReview() {
    if (this.themeNeedsReview && this.currentTheme) {
      // Si le thème nécessite une révision, mettre à jour son état
      this.dataService.markThemeForReview(this.currentTheme);
    }
    this.stopReview();
  }

  checkAnswer() {
    if (!this.currentCard) return;

    const sanitizedUserAnswer = this.userAnswer.trim().toLowerCase().replace(/\s+/g, '');
    const sanitizedCorrectAnswer = this.currentCard.answer.trim().toLowerCase().replace(/\s+/g, '');

    if (sanitizedUserAnswer === '') {
      alert('Veuillez entrer une réponse avant de vérifier.');
      return; // Ne pas vérifier si la réponse est vide
    }

    this.answerChecked = true;
    this.isCorrect = sanitizedUserAnswer === sanitizedCorrectAnswer;

    if (!this.isCorrect) {
      this.themeNeedsReview = true; // Marquer le thème comme à réviser si une erreur
    } else {
      this.dataService.updateCardRepetition(this.currentCard, this.isCorrect);
    }
  }

  nextCard() {
    if (this.hasNextCard()) {
      this.currentCardIndex++;
      this.userAnswer = '';
      this.answerChecked = false;
      this.isCorrect = false;
    }
  }

  hasNextCard(): boolean {
    return this.currentCardIndex < (this.currentTheme?.cards.length || 0) - 1;
  }

  get currentCard(): Card | null {
    return this.currentTheme?.cards[this.currentCardIndex] || null;
  }

  getCategoriesWithThemesToReview(): Category[] {
    const today = new Date();

    return this.categories.map(category => {
      const themesToReview = category.themes.filter(theme => {
        const cardsToReview = theme.cards.filter(card => {
          const nextReviewDate = new Date(card.spacedRepetition.nextReviewDate);
          return nextReviewDate.getTime() <= today.getTime();
        });

        return cardsToReview.length > 0;
      });

      return { ...category, themes: themesToReview };
    }).filter(category => category.themes.length > 0);
  }

  getThemesToReviewLater(): Category[] {
    const today = new Date();

    return this.categories.map(category => {
      const themesToReviewLater = category.themes.filter(theme => {
        const cardsToReviewLater = theme.cards.filter(card => {
          const nextReviewDate = new Date(card.spacedRepetition.nextReviewDate);
          return nextReviewDate.getTime() > today.getTime();
        });

        return cardsToReviewLater.length > 0;
      });

      return { ...category, themes: themesToReviewLater };
    }).filter(category => category.themes.length > 0);
  }

  getThemesWithGoalAchieved(): Category[] {
    return this.categories.map(category => {
      const themesWithGoalAchieved = category.themes.filter(theme => {
        const cardsWithGoalAchieved = theme.cards.filter(card => {
          const reviewCount = card.spacedRepetition.level || 0;
          return reviewCount >= card.spacedRepetition.levelGoal;
        });

        return cardsWithGoalAchieved.length > 0;
      });

      return { ...category, themes: themesWithGoalAchieved };
    }).filter(category => category.themes.length > 0);
  }
}
