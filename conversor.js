const myKey = 'fc3171fe64f743d3b6f1a94eeec7b195'

const form = document.querySelector('form')
const input = document.querySelector('input')
const selectDe = document.querySelector('#selectDE')
const selectPara = document.querySelector('#selectPARA')
const resultado = document.querySelector('.resultado span')
const msgError = document.querySelector('.msgError')
const divImg = document.querySelector('.imgs')



const url = ` https://v6.exchangerate-api.com/v6/be30423126143a165d9f321d/latest/USD`

async function requisicao (){
    const responseCambio = await fetch(url)

    const data = await responseCambio.json()

    renderMoedasInSelect = () =>{
        for(const prop in data.conversion_rates){

            const opcSelectDe = document.createElement('option')
            const opcSelectPara = document.createElement('option')

            opcSelectDe.innerText = prop 
            opcSelectDe.value = prop 

            opcSelectPara.innerText = prop 
            opcSelectPara.value = prop 
           
            selectDe.appendChild(opcSelectDe)

            selectPara.appendChild(opcSelectPara)
        };
    }

    renderMoedasInSelect()

    form.addEventListener('submit', e => {
        e.preventDefault()

        var taxaConversao = data.conversion_rates
    
        var moedaCambio = Object.keys(taxaConversao).map(moeda => ({
             nameMoeda: moeda,
             cambioMoeda:  taxaConversao[moeda]
          }))

        if(input.value.includes(e) || (input.value.trim() == '' || input.value == null)){

            msgError.innerText = 'Preencha correctamente o campo'
            return
        }
        var moedaActual = moedaCambio.find(moeda => moeda.nameMoeda == selectDe.value) 
        var moedaBase = moedaCambio.find(moeda => moeda.nameMoeda == 'USD')
        var moedaDestino = moedaCambio.find(moeda => moeda.nameMoeda == selectPara.value) 

        var convertidoNaMoedaBase = (moedaBase.cambioMoeda/moedaActual.cambioMoeda)*Number(input.value)
        
        var convertidoDestino = convertidoNaMoedaBase*moedaDestino.cambioMoeda

        const valorConveritidoFormatado = convertidoDestino.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })

        const valorInicialFormatado = Number(input.value).toLocaleString('pt-BR')
   

        resultado.innerText =`${valorInicialFormatado} ${moedaActual.nameMoeda} = ${valorConveritidoFormatado} ${moedaDestino.nameMoeda}`
        input.value = ''
        msgError.innerText = ''
    })
}

requisicao()
