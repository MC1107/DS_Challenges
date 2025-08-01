# DS Challenges - Data Science Analytics Platform

A modern, interactive web interface for data science challenges, featuring conversion rate analysis and A/B testing capabilities with beautiful UX/UI design.

## 🌟 Features

### 🔄 Conversion Rate Analysis
- **Interactive Data Upload**: Drag-and-drop CSV file uploads with real-time validation
- **Automated Data Preprocessing**: Outlier removal, missing value handling, and feature engineering
- **Machine Learning Models**: Random Forest and Logistic Regression for conversion prediction
- **Visual Analytics**: Interactive charts showing model performance and conversion trends
- **AI-Generated Insights**: Actionable recommendations for marketing and product teams

### 🧪 A/B Testing Analysis
- **Statistical Testing**: Automated t-tests and confidence interval calculations
- **Multi-file Support**: Upload test data and user metadata separately
- **Configurable Analysis**: Adjustable confidence levels and minimum detectable effects
- **Real-time Results**: Interactive visualizations of test performance
- **Decision Automation**: Clear recommendations on test winners and statistical significance

### 🎨 Modern UI/UX Design
- **Material-UI Components**: Clean, professional interface with consistent design system
- **Dark/Light Mode**: Toggle between themes for optimal user experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Step-by-Step Workflows**: Guided processes with progress indicators
- **Interactive Visualizations**: Rich charts and graphs using Recharts library

## 🏗️ Architecture

```
ds-challenges-interface/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ConversionAnalysis.tsx
│   │   │   └── ABTestingAnalysis.tsx
│   │   └── App.tsx          # Main application
│   └── package.json
├── backend/                 # Python Flask API
│   ├── app.py              # Main server application
│   └── requirements.txt    # Python dependencies
└── package.json            # Root package configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project**
   ```bash
   git clone <repository-url>
   cd ds-challenges-interface
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start both frontend and backend**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Manual Setup

If you prefer to run components separately:

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

## 📊 Usage Guide

### Dashboard
- Overview of platform capabilities
- Quick access to analysis tools
- Performance metrics and statistics
- Getting started guide

### Conversion Rate Analysis
1. **Upload Data**: Drag and drop your conversion CSV file
   - Required columns: `age`, `country`, `total_pages_visited`, `converted`
2. **Data Review**: Preview uploaded data and verify quality
3. **Model Training**: Automated ML model training with real-time progress
4. **Results**: View performance metrics, predictions, and recommendations

### A/B Testing Analysis
1. **Upload Test Data**: Upload test results and optional user metadata
   - Test data columns: `user_id`, `test_group`, `conversion`, `date`
   - User data columns: `user_id`, `age`, `country` (optional)
2. **Configure Analysis**: Set confidence levels and testing parameters
3. **Statistical Testing**: Automated statistical analysis with progress tracking
4. **Results**: Comprehensive test results with winner determination and insights

## 🔧 Technical Details

### Frontend Technologies
- **React 18** with TypeScript for type-safe development
- **Material-UI (MUI)** for consistent, professional design
- **Recharts** for interactive data visualizations
- **React Dropzone** for intuitive file uploads
- **Axios** for API communication

### Backend Technologies
- **Flask** web framework for Python
- **Pandas** for data manipulation and analysis
- **Scikit-learn** for machine learning models
- **SciPy** for statistical testing
- **NumPy** for numerical computing

### Key Features Implementation
- **Responsive Design**: CSS Grid and Flexbox with Material-UI breakpoints
- **Real-time Updates**: WebSocket-like experience with loading states
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Data Validation**: Client and server-side validation for data integrity
- **Performance Optimization**: Lazy loading and efficient re-rendering

## 📈 Data Formats

### Conversion Data CSV
```csv
age,country,total_pages_visited,converted
25,US,5,1
35,UK,8,0
45,CA,12,1
```

### A/B Test Data CSV
```csv
user_id,test_group,conversion,date
1,A,1,2024-01-01
2,B,0,2024-01-01
3,A,1,2024-01-02
```

### User Metadata CSV (Optional)
```csv
user_id,age,country
1,25,US
2,35,UK
3,28,CA
```

## 🎯 Project Goals

### Challenge #1: Conversion Rate
- ✅ Predict conversion rates using machine learning
- ✅ Generate actionable recommendations for product and marketing teams
- ✅ Provide interactive visualizations for data exploration

### Challenge #2: A/B Testing
- ✅ Analyze A/B test results with statistical rigor
- ✅ Automate decision-making processes
- ✅ Design algorithms for systematic test evaluation

## 🚀 Advanced Features

- **Model Interpretability**: Feature importance analysis and SHAP values
- **Automated Insights**: AI-generated recommendations based on data patterns
- **Export Capabilities**: Download reports and visualizations
- **Batch Processing**: Handle large datasets efficiently
- **Real-time Analytics**: Live data processing and updates

## 🔮 Future Enhancements

- Integration with popular analytics platforms (Google Analytics, Mixpanel)
- Advanced statistical tests (Bayesian A/B testing, sequential testing)
- Machine learning model marketplace
- Collaborative analysis features
- API integration capabilities

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
