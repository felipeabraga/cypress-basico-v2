/// <reference types="Cypress" />
//Suite de testes
describe('Central de Atendimento ao Cliente TAT', function () {

  //Antes de tudo faça
  beforeEach(function () {
    //Visita uma URL
    cy.visit('../../src/index.html')
  })

  //Caso de teste
  it('verifica o título da aplicação', function () {
    //Busca o titulo
    cy.title()
      //Deve ser igual a = Central de Atendimento ao Cliente TAT
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    
    //Estou congelando o relogio do navegador
    cy.clock()
    
    
    // Estou dizendo, busque o elemento input com os atributos tipo = text e id=firstName, podem ser colocados mais especificações
    cy.get('input[type="text"][id="firstName"]')
      .should('be.visible')
      .type('Felipe')
      .should('have.value', 'Felipe')

    cy.get('input[type="text"][id="lastName"]')
      .should('be.visible')
      .type('Braga')
      .should('have.value', 'Braga')

    cy.get('input[type="email"][id="email"]')
      .should('be.visible')
      .type('felipe@tests.com')
      .should('have.value', 'felipe@tests.com')
    
    
    cy.get('textarea[id="open-text-area"]')
      .should('be.visible')
      .type('Teste teste teste ', {delay:90})
      .should('have.value', 'Teste teste teste ')

    // cy.get('button[type="submit"]')
    //   .contains('Enviar')
    // outra maneira de pegar o botao é procurar o elemento, com o texto enviar
    cy.contains('button', "Enviar")
    .click()


    cy.get('span[class="success"]')
    .should('be.visible')

    //Estou avançando no tempo, 3000 milisegundos, 3 segundos
    cy.tick(3000)
    cy.get('span[class="success"]')
    .should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('input[type="text"][id="firstName"]')
      .should('be.visible')
      .type('Felipe')
      .should('have.value', 'Felipe')

    cy.get('input[type="text"][id="lastName"]')
      .should('be.visible')
      .type('Braga')
      .should('have.value', 'Braga')

    cy.get('input[type="email"][id="email"]')
      .should('be.visible')
      .type('felipe@tests,com')
      
    
    
    cy.get('textarea[id="open-text-area"]')
      .should('be.visible')
      .type('Teste teste teste ', {delay:0})
      .should('have.value', 'Teste teste teste ')

    // cy.get('button[type="submit"]')
    //   .contains('Enviar')
    cy.contains('button', "Enviar")
      .click()


    cy.get('span[class="error"]')
      .should('be.visible')

  })

  it('campo telefone permanece vazio após inserir valor não-numérico', function(){
    cy.get('input[type="number"][id="phone"]')
      .type('ABC')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
    cy.get('input[type="text"][id="firstName"]')
    .should('be.visible')
    .type('Felipe')
    .should('have.value', 'Felipe')

  cy.get('input[type="text"][id="lastName"]')
    .should('be.visible')
    .type('Braga')
    .should('have.value', 'Braga')

  cy.get('input[type="email"][id="email"]')
    .should('be.visible')
    .type('felipe@tests.com')
    .should('have.value', 'felipe@tests.com')
  
  cy.get('input[type="checkbox"][id="phone-checkbox"]')
    .check()


  cy.get('textarea[id="open-text-area"]')
    .should('be.visible')
    .type('Teste teste teste ')
    .should('have.value', 'Teste teste teste ')

    
    // cy.get('button[type="submit"]')
    //   .contains('Enviar')
    cy.contains('button', "Enviar")
      .click()


    cy.get('span[class="error"]')
      .should('be.visible')

  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    
    cy.get('input[type="text"][id="firstName"]')
    .should('be.visible')
    .type('Felipe')
    .should('have.value', 'Felipe')
    .clear()
    .should('have.value', '')

  cy.get('input[type="text"][id="lastName"]')
    .should('be.visible')
    .type('Braga')
    .should('have.value', 'Braga')
    .clear()
    .should('have.value', '')

  cy.get('input[type="email"][id="email"]')
    .should('be.visible')
    .type('felipe@tests.com')
    .should('have.value', 'felipe@tests.com')
    .clear()
    .should('have.value', '')
  
  
  cy.get('textarea[id="open-text-area"]')
    .should('be.visible')
    .type('Teste teste teste ', {delay:90})
    .should('have.value', 'Teste teste teste ')
    .clear()
    .should('have.value', '')

    cy.get('input[type="number"][id="phone"]')
    .type('12345678')
    .should('have.value', '12345678')
    .clear()
    .should('have.value', '')
    

  })
  //Estou utilizando a biblioteca do mundo do Javascript Lodash, através do "Cypres._.", por padrao o cypress ja empacota ela junto
  Cypress._. times(5, function(){
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){
      cy.get('button[type="submit"]')
      .contains('Enviar')
      .click()


      cy.get('span[class="error"]')
      .should('be.visible')
    
    })
  })
  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    //Estou congelando o relogio do navegador
    cy.clock()
    cy.get('span[class="success"]')
    .should('be.visible')

    //Estou avançando no tempo, 3000 milisegundos, 3 segundos
    cy.tick(3000)
    cy.get('span[class="success"]')
    .should('not.be.visible')
    



  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('select[id="product"]')
    //Selecionando pelo text
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('select[id="product"]')
    //Selecionando pelo value
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('select[id="product"]')
    //Selecionando pelo value
      .select(1)
      .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio)
          .check()
        cy.wrap($radio)
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último',function(){
    // Jeito que eu fiz
    //  cy.get('input[type="checkbox"][id="email-checkbox"]')
    //    .check()
  
    //  cy.get('input[type="checkbox"][id="phone-checkbox"]')
    //    .check()
    //    .uncheck()
  
    //  cy.get('input[type="checkbox"][id="email-checkbox"]')
    //    .should('be.checked')
    
    // Jeito descrito no curso
    
    // Pega todos os checkbox
    cy.get('input[type="checkbox"]')
    //Check todos
      .check()
      .should('be.checked')  
      //Busca o ultimo
      .last()
      .uncheck()
      .should('not.be.checked')  

  })

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"][id="file-upload"]')
      .should('not.have.value')
    //O caminho funcionas porque o cypressa leva em consideração o cypress.json
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })

  })
  
  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"][id="file-upload"]')
    .should('not.have.value')
  //O caminho funciona porque o cypressa leva em consideração o cypress.json
  // Simula o drag drop
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json')
      .as('sampleFile')

    cy.get('input[type="file"][id="file-upload"]')
      .should('not.have.value')  
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })


  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
  // Busca o link que seja privacy.html
    cy.get('a[href="privacy.html"]')
      //Deve ter o atributo target, e este atributo deve ser blank
      .should('have.attr', 'target', '_blank')
  })
  
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('a[href="privacy.html"]')
    //Invoke usado pra remover/deletar certos atributos/classes
      .invoke('removeAttr', 'target')
      .click()
    
    cy.get('#title')
      .should('contain', 'CAC TAT - Política de privacidade')

  })
  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){
    //Pega o elemento com a  classe success
    cy.get('.success')
      .should('not.be.visible')
      //Invoke forçando a exibição de um elemento com o display:none, 
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      //Invoke forçando que o elemento fique escondido, 
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it.only('preenche a area de texto usando o comando invoke', function(){
    //Estou criando uma variável
    //const longtext = 'Test test Test test Test test Test test Test test Test test '

    //Forma mais inteligente de criar um texto que se repete, escreva 'Test ' 20 vezes
    const longtext= Cypress._.repeat('Test ', 20)

    cy.get('textarea[id="open-text-area"]')
      .should('be.visible')
      //Invoca o valor do elemento pego pelo cy.get, e setta nesse valor o texto informando antes
      .invoke('val', longtext)
      .should('have.value', longtext)
  })
  it.only('faz uma requisição HTTP', function(){
    cy.request('GET', 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      //Função está utilizando da resposta da requisição
      .should(function(response){
        //Criei 3 variaveis, desestruturando um objeto em Javascript 
        const {status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })
  it.only('ache o gato', function(){
    cy.get('span[id="cat"]')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
    //Outra funcao do invoke, selecionar o texto do elemento e altera-lo
    cy.get('#title')
      .invoke('text', 'Eu amo Cachorros')
  })

})



// PRA SIMULAR DISPOSITIVO MOVEL ACESSE O PACKAGE.JSON E ALTERE AS DIMENSOES NO SCRIPT
// EU INSERI DA SEGUINTE MANEIRA  "cy:mobile": "cypress open --config viewportWidth=410 viewportHeight=860"
// EXECUTA O SCRIPT cy:mobile no cmder mesmo, exemplo npm run cy:mobile


// PRA FAZER O MODO HEADLESS é o "test: cypress run" no package.json