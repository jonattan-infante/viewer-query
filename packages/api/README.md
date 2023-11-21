# API con FastAPi

Este paquete esta encargo de proveer la persistencia en las diferencias funcionalidades de querys, comentarios y usuarios. 

Para ejecutarlo se debe usar el comando: 

`uvicorn main:app --reload`

## Migraciones

Este proyecto usa el sistema de migraciones para mantener un orden en los cambios que se aplican al modelo. 

Puedes cambiar el modelo y autogenerarlas usando el comando: 
`alembic revision --autogenerate -m "your message"`

Para sincronizar los cambios de la migración con la base de datos se puede usar: 

`alembic upgrade head`

## BigQuery

Este proyecto requiere de que se agregue en la raiz un JSON de credenciales de Big Query para poder acceder a los dataset de Google. 