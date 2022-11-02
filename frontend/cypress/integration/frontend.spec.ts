describe('tests the home screen of page', () => {
    beforeEach( () => {
        cy.visit('http://localhost:3000');
    });
    
    it('should display ten stories when opening for the first time', () => {
        cy.get('[data-testid="stories-list"]').should('exist');
        cy.get('[data-testid="stories-list"]').should('have.length', 10);
    });

    it('should show only stories with titles containing "dreams", and the story list should have length of one', () => {
        cy.get('[data-testid="search-input"]').type('dreams');
        cy.get('[data-testid="search-button"]').click();
        cy.contains('dreams').should('exist');
        cy.get('[data-testid="stories-list"]').should('have.length', 1);
    });

    it('allows checking a story as disliked', () => {
        cy.get('[data-testid="search-input"]').type('dreams');
        cy.get('[data-testid="search-button"]').click();
        cy.contains('dreams').parent().find('input[type=checkbox]').click();
        cy.contains('dreams').parent().find('input[type=checkbox]').click();
    });     

    it('allows checking a story as liked', () => {
        cy.get('[data-testid="search-input"]').type('dreams');
        cy.get('[data-testid="search-button"]').click();
        cy.contains('dreams').parent().find('input[type=checkbox]').click();
    }); 


    // this one doesnt work yet
    // it('reaction label should increment when like button is clicked ', () => {
    //     cy.get('[data-testid="search-input"]').type('dreams');
    //     cy.get('[data-testid="search-button"]').click();
    //     var numberOld: number = +cy.get('[data-testid="reactions-label"]');
    //     var numberNew: number = +numberOld+1;
    //     var numberNewString = numberNew.toString();
    //     cy.contains('dreams').parent().find('input[type=checkbox]').click();
    //     cy.contains('dreams').parent().find('[data-testid="reactions-label"]').get('[data-testid="reactions-label"]').contains(numberNewString);
    // });

});  