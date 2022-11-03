import { contains } from "cypress/types/jquery";

describe('tests the home screen of page', () => {
    beforeEach( () => {
        cy.visit('http://localhost:3000');
    });
    
    // testing initial display of stories
    it('should display ten stories when opening for the first time', () => {
        cy.get('[data-testid="stories-list"]').should('exist');
        cy.get('[data-testid="stories-list"]').should('have.length', 10);
    });

    // testing result from search
    it('should show story with title containing "dreams", and the story list should have length of one', () => {
        cy.get('[data-testid="search-input"]').type('dreams');
        cy.get('[data-testid="search-button"]').click();
        cy.contains('dreams').should('exist');
        cy.get('[data-testid="stories-list"]').should('have.length', 1);
    });

    // testing "read more" button
    it('should show story tags when "Read more" button is pressed', () => {
        cy.get('[data-testid="read-more-button"]').click({multiple: true});
        cy.contains('Tags').should('exist');
    });

    // testing sort:
    // think this can be done similarly to the test about "reaction label incrementing when checkbox clicked"
    // written further down

    // testing filter
    it('should select a tag to filter stories on', () => {
        cy.get('[data-testid="filter-select"]').should('exist');
        cy.get('[data-testid="filter-select"]').select('Magical').should('have.value', 'magical');
    });

    // testing result from search "time" and filter "history"
    it('should show story with title containing "time" and tag "history', () => {
        cy.get('[data-testid="search-input"]').type('time');
        cy.get('[data-testid="search-button"]').click();
        cy.get('[data-testid="filter-select"]').select('History').should('have.value', 'history');
        cy.contains('time').should('exist');
        cy.get('[data-testid="stories-list"]').should('have.length', 2);
        cy.get('[data-testid="read-more-button"]').click({multiple: true});
        cy.get('[data-testid="stories-list"]').children('[data-testid="tags"]').should('contain', 'history');
    });

    // testing like
    it('can check a story as liked', () => {
        cy.get('[data-testid="search-input"]').type('colors');
        cy.get('[data-testid="search-button"]').click();
        cy.contains('colors').parent().find('input[type=checkbox]').click();
    }); 

    // testing dislike
    it('can check a story as disliked', () => {
        cy.get('[data-testid="search-input"]').type('fire');
        cy.get('[data-testid="search-button"]').click();
        cy.contains('fire').parent().find('input[type=checkbox]').click();
        cy.contains('fire').parent().find('input[type=checkbox]').click();
    });    

    // testing if reaction number increments when checkbox is clicked on
    it('reaction label should increment when like button is clicked ', () => {
        cy.get('[data-testid="search-input"]').type('dreams');
        cy.get('[data-testid="search-button"]').click();
        cy.contains('dreams').parent().find('[data-testid="reactions-label"]').then(($numberBefore) => {
            const txt = $numberBefore.text()
            var _numberBefore: number = +txt

            cy.contains('dreams').parent().find('input[type=checkbox]').click();
            cy.contains('dreams').parent().find('[data-testid="reactions-label"]').should(($numberAfter) => {
                const txt2 = $numberAfter.text();
                var _numberAfter: number = +txt2
                expect(_numberBefore).to.equal(_numberAfter-1);
            });
        });
    
    });
});  