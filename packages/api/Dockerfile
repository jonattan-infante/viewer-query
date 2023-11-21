FROM python:3.9

# Copia los archivos de la aplicación en el contenedor
COPY . /app

# Establece el directorio de trabajo
WORKDIR /app

# Instala las dependencias de la aplicación
RUN pip install -r requirements.txt

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 8000

# Especifica el comando para iniciar el servidor de desarrollo
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

CMD alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port 8000
