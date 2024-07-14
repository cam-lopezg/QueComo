describe ('Navigation Tests', () => {
    it('should navigate to the about page', ()=> {
        cy.visit('http://localhost:8100'); //asegurarse que el servidor de desarrollo se este ejecutando en este puerto

        cy.get('ion-button').contains('SIGN IN').click();
        cy.get('ion-button').contains('SI AUN NO TIENES CUENTA, REGISTRATE!').click();
        
    
    });
});