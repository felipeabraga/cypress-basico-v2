  //Estou utilizando a biblioteca do mundo do Javascript Lodash, através do "Cypres._.", por padrao o cypress ja empacota ela junto
Cypress._. times(5, function(){
    it('testa a página da política de privavidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing')
            .should('be.visible')
    })

})