import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Alert,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material';
import {
  CloudUpload,
  Analytics,
  ModelTraining,
  TrendingUp,
  CheckCircle,
  PlayArrow,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface AnalysisResult {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  predictions: Array<{ age: number; country: string, predicted_conversion: number }>;
  recommendations: string[];
}

const ConversionAnalysis: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dataPreview, setDataPreview] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const steps = ['Upload Data', 'Data Preview', 'Train Model', 'Results & Insights'];

  // Mock data for demonstration
  const sampleData = [
    { age: 25, country: 'US', total_pages_visited: 5, converted: 1 },
    { age: 35, country: 'UK', total_pages_visited: 8, converted: 0 },
    { age: 45, country: 'CA', total_pages_visited: 12, converted: 1 },
    { age: 30, country: 'DE', total_pages_visited: 3, converted: 0 },
    { age: 28, country: 'FR', total_pages_visited: 15, converted: 1 },
  ];

  const mockResults: AnalysisResult = {
    accuracy: 0.87,
    precision: 0.82,
    recall: 0.89,
    f1Score: 0.85,
    predictions: [
      { age: 25, country: 'US', predicted_conversion: 0.78 },
      { age: 35, country: 'UK', predicted_conversion: 0.45 },
      { age: 28, country: 'FR', predicted_conversion: 0.92 },
    ],
    recommendations: [
      'Focus marketing efforts on users aged 25-35 for highest conversion rates',
      'Improve user experience for visitors from UK to increase conversion likelihood',
      'Users who visit 10+ pages are 3x more likely to convert - implement engagement strategies',
      'Consider targeted campaigns for French market showing highest conversion potential',
    ],
  };

  const performanceData = [
    { metric: 'Accuracy', value: 87 },
    { metric: 'Precision', value: 82 },
    { metric: 'Recall', value: 89 },
    { metric: 'F1-Score', value: 85 },
  ];

  const conversionByAge = [
    { ageGroup: '18-25', conversion: 0.65 },
    { ageGroup: '26-35', conversion: 0.78 },
    { ageGroup: '36-45', conversion: 0.82 },
    { ageGroup: '46-55', conversion: 0.71 },
    { ageGroup: '55+', conversion: 0.58 },
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    setDataPreview(sampleData);
    setActiveStep(1);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  const handleTrainModel = async () => {
    setIsLoading(true);
    setActiveStep(2);
    
    // Simulate model training
    setTimeout(() => {
      setAnalysisResult(mockResults);
      setActiveStep(3);
      setIsLoading(false);
    }, 3000);
  };

  const handleReset = () => {
    setActiveStep(0);
    setUploadedFile(null);
    setDataPreview([]);
    setAnalysisResult(null);
    setIsLoading(false);
  };

  const renderUploadStep = () => (
    <Card elevation={2}>
      <CardContent>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: isDragActive ? 'action.hover' : 'background.paper',
            transition: 'all 0.2s ease',
          }}
        >
          <input {...getInputProps()} />
          <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Upload Conversion Data
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Drag and drop your CSV file here, or click to select
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Expected columns: age, country, total_pages_visited, converted
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const renderDataPreview = () => (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Data Preview</Typography>
          <Chip label={`${dataPreview.length} rows`} color="primary" />
        </Box>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Age</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Pages Visited</TableCell>
                <TableCell>Converted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPreview.slice(0, 5).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.total_pages_visited}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.converted ? 'Yes' : 'No'}
                      color={row.converted ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="contained"
            startIcon={<ModelTraining />}
            onClick={handleTrainModel}
            size="large"
          >
            Train Conversion Model
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const renderTrainingStep = () => (
    <Card elevation={2}>
      <CardContent sx={{ textAlign: 'center' }}>
        <ModelTraining sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Training Conversion Prediction Model
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Processing data and training machine learning models...
        </Typography>
        <LinearProgress sx={{ mb: 2 }} />
        <Typography variant="caption" color="text.secondary">
          This may take a few moments
        </Typography>
      </CardContent>
    </Card>
  );

  const renderResults = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Charts */}
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Model Performance */}
        <Box sx={{ flex: 1 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Model Performance
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                  <Bar dataKey="value" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Conversion by Age Group */}
        <Box sx={{ flex: 1 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Conversion Rate by Age Group
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={conversionByAge}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ageGroup" />
                  <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Conversion Rate']} />
                  <Line type="monotone" dataKey="conversion" stroke="#4caf50" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Recommendations */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUp sx={{ mr: 1 }} />
            AI-Generated Recommendations
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {mockResults.recommendations.map((rec, index) => (
              <Alert key={index} severity="info">
                {rec}
              </Alert>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Actions */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{ mr: 2 }}
        >
          Reset Analysis
        </Button>
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
        >
          Export Results
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Conversion Rate Analysis
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && renderUploadStep()}
      {activeStep === 1 && renderDataPreview()}
      {activeStep === 2 && renderTrainingStep()}
      {activeStep === 3 && renderResults()}
    </Box>
  );
};

export default ConversionAnalysis;