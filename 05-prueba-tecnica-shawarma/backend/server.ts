import express from "express";
import cors from "cors";
import multer from "multer";
import csvToJson from "convert-csv-to-json";

const app = express();
const port = process.env.PORT ?? 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

let userData: Array<Record<string, string>> = [];

app.use(cors());// para que se pueda acceder desde cualquier lugar

app.post('/api/files', upload.single('file'), async (req, res) => {
  // 1. Extract file from request
  const { file } = req;

  // 2. Validate that we have a file
  if (!file) {
    return res.status(500).json({ message: 'File is required!' });
  }

  // 3. Validate the mimetype (csv)
  if (file.mimetype !== 'text/csv') {
    return res.status(500).json({ message: 'File must be a CSV' });
  }

  let json: Array<Record<string, string>> = [];
  try {
    // 4. Transform the file (buffer) to a string
    const rawCsv = Buffer.from(file.buffer).toString('utf8');
    console.log(rawCsv);
    
    // 5. Transform the string to a CSV
    json = csvToJson.csvStringToJson(rawCsv);

  } catch (error) {
    return res.status(500).json({ message: 'Error parsing the CSV file' });
  }

  // 6. Save the JSON to db (or memory)
  userData = json;

  // 7. Return 200 with the message and the JSON    
  return res.status(200).json({ data: [], message: 'File uploaded successfully' });
})

app.get('/api/users', async (req, res) => {
  // 1. Extract the query param `q` from the request
  const { q } = req.query;

  // 2. Validate that we have the query param
  if (!q) {
    return res.status(500).json({ message: 'Query param `q` is required' });
  }

  if (Array.isArray(q)) {
    return res.status(500).json({ message: 'Query param `q` must be a string' });
  }

  // 3. Filter the data from the db (or memory) with the query param
  const search = q.toString().toLowerCase();

  const filteredData = userData.filter(row => {
    Object
    .values(row)
    .some(value => value.toLowerCase().includes(search));
  });

  // 4. Return 200 with the filtered data
  return res.status(200).json({ data: filteredData });
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
