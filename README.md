## Want to use this project?

1. Fork/Clone

1. Run the server-side FastAPI app in one terminal window:

   ```sh
   $ cd backend
   $ python3.9 -m venv venv
   $ source venv/bin/activate
   (env)$ pip install -r requirements.txt
   (env)$ python main.py
   ```

   Navigate to [http://localhost:8000](http://localhost:8000)

1. Run the client-side React app in a different terminal window:

   ```sh
   $ cd frontend
   $ pnpm install
   $ pnpm run dev
   ```

   Navigate to [http://localhost:3000](http://localhost:3000)
