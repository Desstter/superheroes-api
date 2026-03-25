# Superheroes API

Explorador de superhéroes que consume la [Superhero API](https://www.superheroapi.com/). Busca cualquier héroe o villano, consulta sus estadísticas de poder y compara personajes.

## Stack

JavaScript · Node.js · Express · JSON Server

## Features

- Búsqueda de superhéroes por nombre
- Visualización de estadísticas: inteligencia, fuerza, velocidad, durabilidad, poder y combate
- Datos de biografía, apariencia y conexiones
- Backend con json-server para datos locales

## Setup

```bash
# Servidor (primero)
cd server
npm install
npx json-server --watch db.json

# Cliente (en otra terminal)
cd client
npm install
npm start
```
