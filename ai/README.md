Doc-Summarizer AI service — quick setup

1) Create and activate virtual environment (recommended)

   cd ai
   python -m venv venv
   source venv/bin/activate

2) Install Python dependencies

   pip install -r requirements.txt

3) Run the app (after DB is up — see Docker section)

   uvicorn main:app --reload

Docker: start MySQL and create schema

   cd ai
   docker compose up -d

The docker-compose will start a MySQL 8 container and the `schema.sql` file will be executed automatically on first run to create the `doc_summarizer` schema and tables.

If you see ModuleNotFoundError for `youtube_transcript_api`:
- Make sure the venv is activated (see step 1).
- Then run: `pip install -r requirements.txt`.

Notes:
- Edit `.env` in `ai/` to set `GEMINI_API_KEY` and database connection info if you override the docker defaults.
- On macOS, use zsh-compatible `source venv/bin/activate`.
