# Route Optimizer API

A Route Optimizer API é um serviço baseado em Node.js e TypeScript que utiliza a Google Maps API para fornecer rotas otimizadas, cálculo de custos de combustível e informações de condições de tráfego em tempo real.

## Endpoints

### 1. **Otimização de Rotas**
**Endpoint:** `POST /api/routes/optimize`

**Descrição:** Calcula a melhor rota entre os locais fornecidos.

**Exemplo de Entrada:**
```json
{
  "locations": ["São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG"],
  "mode": "driving"
}
```

**Exemplo de Resposta:**
```json
{
  "routes": [
    {
      "summary": "BR-116",
      "legs": [
        {
          "distance": { "text": "434 km", "value": 434000 },
          "duration": { "text": "5 horas 30 minutos", "value": 19800 },
          "start_address": "São Paulo, SP, Brasil",
          "end_address": "Rio de Janeiro, RJ, Brasil"
        }
      ]
    }
  ]
}
```

---

### 2. **Cálculo de Custo de Combustível**
**Endpoint:** `POST /api/routes/cost`

**Descrição:** Calcula o custo estimado de combustível para a rota fornecida.

**Exemplo de Entrada:**
```json
{
  "locations": ["São Paulo, SP", "Rio de Janeiro, RJ"],
  "mode": "driving",
  "fuelConsumption": 10,
  "fuelPrice": 5.5
}
```

**Exemplo de Resposta:**
```json
{
  "distance": "434.00 km",
  "fuelCost": "238.70"
}
```

---

### 3. **Condições de Tráfego em Tempo Real**
**Endpoint:** `POST /api/routes/traffic`

**Descrição:** Retorna informações sobre condições de tráfego na rota fornecida.

**Exemplo de Entrada:**
```json
{
  "locations": ["São Paulo, SP", "Rio de Janeiro, RJ"],
  "mode": "driving",
  "departureTime": "now"
}
```

**Exemplo de Resposta:**
```json
{
  "summary": "BR-116",
  "legs": [
    {
      "start_address": "São Paulo, SP, Brasil",
      "end_address": "Rio de Janeiro, RJ, Brasil",
      "distance": "434 km",
      "duration": "5 horas 30 minutos",
      "duration_in_traffic": "6 horas 15 minutos"
    }
  ]
}
```

---

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/Gustavohenribra/route-optmizer-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```plaintext
   GOOGLE_MAPS_API_KEY=<sua-chave-da-api>
   ```

4. Execute o servidor:
   ```bash
   npm run dev
   ```

5. O servidor estará disponível em: `http://localhost:3000`

---

## Tecnologias Utilizadas
- **Node.js**
- **TypeScript**
- **Express**
- **Google Maps API**

---

## Licença
Este projeto está sob a licença MIT.

