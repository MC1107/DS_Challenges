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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  CloudUpload,
  Science,
  Assessment,
  CheckCircle,
  Warning,
  TrendingUp,
  PlayArrow,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface TestResult {
  testGroup: string;
  conversions: number;
  totalUsers: number;
  conversionRate: number;
  confidenceInterval: [number, number];
}

interface StatisticalAnalysis {
  pValue: number;
  significance: boolean;
  confidenceLevel: number;
  effectSize: number;
  recommendation: string;
  winner: string;
}

const ABTestingAnalysis: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [testData, setTestData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisConfig, setAnalysisConfig] = useState({
    confidenceLevel: 95,
    testMetric: 'conversion_rate',
    minimumDetectableEffect: 0.05,
  });
  const [results, setResults] = useState<{
    testResults: TestResult[];
    analysis: StatisticalAnalysis;
  } | null>(null);

  const steps = ['Upload Data', 'Configure Analysis', 'Run Statistical Tests', 'Results & Recommendations'];

  // Mock data for demonstration
  const sampleTestData = [
    { user_id: 1, test_group: 'A', conversion: 1, date: '2024-01-01' },
    { user_id: 2, test_group: 'B', conversion: 0, date: '2024-01-01' },
    { user_id: 3, test_group: 'A', conversion: 1, date: '2024-01-02' },
    { user_id: 4, test_group: 'B', conversion: 1, date: '2024-01-02' },
    { user_id: 5, test_group: 'A', conversion: 0, date: '2024-01-03' },
  ];

  const sampleUserData = [
    { user_id: 1, age: 25, country: 'US' },
    { user_id: 2, age: 35, country: 'UK' },
    { user_id: 3, age: 28, country: 'CA' },
    { user_id: 4, age: 42, country: 'DE' },
    { user_id: 5, age: 31, country: 'FR' },
  ];

  const mockResults = {
    testResults: [
      {
        testGroup: 'Control (A)',
        conversions: 847,
        totalUsers: 4982,
        conversionRate: 0.17,
        confidenceInterval: [0.158, 0.182] as [number, number],
      },
      {
        testGroup: 'Variant (B)',
        conversions: 1003,
        totalUsers: 5017,
        conversionRate: 0.20,
        confidenceInterval: [0.188, 0.212] as [number, number],
      },
    ],
    analysis: {
      pValue: 0.0023,
      significance: true,
      confidenceLevel: 95,
      effectSize: 0.03,
      recommendation: 'Implement Variant B - it shows statistically significant improvement',
      winner: 'Variant B',
    },
  };

  const performanceMetrics = [
    { group: 'Control (A)', conversions: 847, users: 4982, rate: 17.0 },
    { group: 'Variant (B)', conversions: 1003, users: 5017, rate: 20.0 },
  ];

  const dailyConversions = [
    { date: 'Day 1', controlA: 45, variantB: 52 },
    { date: 'Day 2', controlA: 48, variantB: 61 },
    { date: 'Day 3', controlA: 42, variantB: 58 },
    { date: 'Day 4', controlA: 51, variantB: 64 },
    { date: 'Day 5', controlA: 47, variantB: 59 },
    { date: 'Day 6', controlA: 49, variantB: 62 },
    { date: 'Day 7', controlA: 46, variantB: 57 },
  ];

  const COLORS = ['#1976d2', '#4caf50'];

  const onDrop = useCallback((acceptedFiles: File[], fileType: 'test' | 'user') => {
    const file = acceptedFiles[0];
    if (fileType === 'test') {
      setTestData(sampleTestData);
    } else {
      setUserData(sampleUserData);
    }
    
    if (testData.length > 0 || fileType === 'test') {
      setActiveStep(1);
    }
  }, [testData]);

  const testDropzone = useDropzone({
    onDrop: (files) => onDrop(files, 'test'),
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  });

  const userDropzone = useDropzone({
    onDrop: (files) => onDrop(files, 'user'),
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  });

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    setActiveStep(2);
    
    // Simulate statistical analysis
    setTimeout(() => {
      setResults(mockResults);
      setActiveStep(3);
      setIsLoading(false);
    }, 3000);
  };

  const handleReset = () => {
    setActiveStep(0);
    setTestData([]);
    setUserData([]);
    setResults(null);
    setIsLoading(false);
  };

  const renderUploadStep = () => (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ flex: 1 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Test Data
            </Typography>
            <Box
              {...testDropzone.getRootProps()}
              sx={{
                border: '2px dashed',
                borderColor: testDropzone.isDragActive ? 'primary.main' : 'grey.300',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: testDropzone.isDragActive ? 'action.hover' : 'background.paper',
              }}
            >
              <input {...testDropzone.getInputProps()} />
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Upload test results CSV
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Columns: user_id, test_group, conversion, date
              </Typography>
            </Box>
            {testData.length > 0 && (
              <Chip label={`${testData.length} records loaded`} color="success" sx={{ mt: 2 }} />
            )}
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Data (Optional)
            </Typography>
            <Box
              {...userDropzone.getRootProps()}
              sx={{
                border: '2px dashed',
                borderColor: userDropzone.isDragActive ? 'primary.main' : 'grey.300',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: userDropzone.isDragActive ? 'action.hover' : 'background.paper',
              }}
            >
              <input {...userDropzone.getInputProps()} />
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Upload user metadata CSV
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Columns: user_id, age, country, etc.
              </Typography>
            </Box>
            {userData.length > 0 && (
              <Chip label={`${userData.length} users loaded`} color="success" sx={{ mt: 2 }} />
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );

  const renderConfigStep = () => (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Analysis Configuration
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, mt: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Confidence Level</InputLabel>
              <Select
                value={analysisConfig.confidenceLevel}
                onChange={(e) => setAnalysisConfig({
                  ...analysisConfig,
                  confidenceLevel: Number(e.target.value)
                })}
              >
                <MenuItem value={90}>90%</MenuItem>
                <MenuItem value={95}>95%</MenuItem>
                <MenuItem value={99}>99%</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Primary Metric</InputLabel>
              <Select
                value={analysisConfig.testMetric}
                onChange={(e) => setAnalysisConfig({
                  ...analysisConfig,
                  testMetric: e.target.value
                })}
              >
                <MenuItem value="conversion_rate">Conversion Rate</MenuItem>
                <MenuItem value="revenue">Revenue per User</MenuItem>
                <MenuItem value="engagement">Engagement Rate</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Min. Detectable Effect"
              type="number"
              value={analysisConfig.minimumDetectableEffect}
              onChange={(e) => setAnalysisConfig({
                ...analysisConfig,
                minimumDetectableEffect: Number(e.target.value)
              })}
              InputProps={{ endAdornment: '%' }}
            />
          </Box>
        </Box>

        {/* Data Preview */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Data Preview
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Test Group</TableCell>
                  <TableCell>Conversion</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testData.slice(0, 5).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.user_id}</TableCell>
                    <TableCell>
                      <Chip
                        label={`Group ${row.test_group}`}
                        color={row.test_group === 'A' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.conversion ? 'Converted' : 'Not Converted'}
                        color={row.conversion ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Science />}
            onClick={handleRunAnalysis}
            size="large"
          >
            Run Statistical Analysis
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const renderAnalysisStep = () => (
    <Card elevation={2}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Science sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Running Statistical Analysis
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Performing t-tests, calculating confidence intervals, and generating insights...
        </Typography>
        <LinearProgress sx={{ mb: 2 }} />
        <Typography variant="caption" color="text.secondary">
          Analyzing {testData.length} test records
        </Typography>
      </CardContent>
    </Card>
  );

  const renderResults = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Test Summary */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            A/B Test Results Summary
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1, textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="h4" color="primary">
                {mockResults.analysis.winner}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Winner
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'center', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="h4" color={mockResults.analysis.significance ? 'success.main' : 'warning.main'}>
                {mockResults.analysis.significance ? 'Significant' : 'Not Significant'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                p-value: {mockResults.analysis.pValue.toFixed(4)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Charts */}
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Conversion Rate Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                  <Bar dataKey="rate" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Conversion Trend
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyConversions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="controlA" stroke="#1976d2" name="Control A" strokeWidth={2} />
                  <Line type="monotone" dataKey="variantB" stroke="#4caf50" name="Variant B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Recommendations */}
      <Alert severity="success" sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          🎉 Recommendation: {mockResults.analysis.recommendation}
        </Typography>
        <Typography variant="body2">
          Variant B shows a statistically significant improvement in conversion rate with 95% confidence.
          The effect size of 3% represents a meaningful business impact that justifies implementation.
        </Typography>
      </Alert>

      {/* Actions */}
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="outlined" onClick={handleReset} sx={{ mr: 2 }}>
          New Analysis
        </Button>
        <Button variant="contained" startIcon={<PlayArrow />}>
          Export Report
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        A/B Testing Analysis
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && renderUploadStep()}
      {activeStep === 1 && renderConfigStep()}
      {activeStep === 2 && renderAnalysisStep()}
      {activeStep === 3 && renderResults()}
    </Box>
  );
};

export default ABTestingAnalysis;