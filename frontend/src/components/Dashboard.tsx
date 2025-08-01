import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  Science,
  Analytics,
  DataUsage,
  Speed,
  Assessment,
  CheckCircle,
  Warning,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const features = [
    {
      title: 'Conversion Rate Analysis',
      description: 'Predict conversion rates and generate actionable insights',
      icon: <TrendingUp />,
      color: '#4caf50',
      status: 'Ready',
      features: ['Data preprocessing', 'ML model training', 'Prediction insights', 'Recommendations'],
    },
    {
      title: 'A/B Testing Analysis',
      description: 'Analyze test results and automate decision making',
      icon: <Science />,
      color: '#2196f3',
      status: 'Ready',
      features: ['Statistical analysis', 'Automated insights', 'Performance metrics', 'Test recommendations'],
    },
  ];

  const stats = [
    { label: 'Models Available', value: '2', icon: <Analytics />, color: '#ff9800' },
    { label: 'Data Sources', value: '4+', icon: <DataUsage />, color: '#9c27b0' },
    { label: 'Analysis Types', value: '6', icon: <Assessment />, color: '#f44336' },
    { label: 'Processing Speed', value: 'Real-time', icon: <Speed />, color: '#00bcd4' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Analytics Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome to the Data Science Challenges platform. Analyze conversion rates, run A/B tests, and generate actionable insights for your business.
      </Typography>

      {/* Stats Overview */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{ flex: { xs: '1 1 45%', sm: '1 1 22%' } }}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: stat.color,
                    width: 56,
                    height: 56,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Feature Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {features.map((feature, index) => (
          <Box key={index} sx={{ flex: 1 }}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: feature.color,
                      width: 40,
                      height: 40,
                      mr: 2,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                      {feature.title}
                    </Typography>
                    <Chip
                      label={feature.status}
                      color="success"
                      size="small"
                      icon={<CheckCircle />}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {feature.description}
                </Typography>
                <List dense>
                  {feature.features.map((feat, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={feat}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Quick Start Guide */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Assessment sx={{ mr: 1 }} />
            Quick Start Guide
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Conversion Rate Analysis:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                1. Upload your conversion data (CSV format)<br/>
                2. Review data preprocessing results<br/>
                3. Train and evaluate ML models<br/>
                4. Generate predictions and recommendations
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                A/B Testing Analysis:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                1. Upload test and user data<br/>
                2. Configure analysis parameters<br/>
                3. Run statistical analysis<br/>
                4. Review results and automated insights
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;