from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import io

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Backend is running"})

@app.route('/api/conversion/analyze', methods=['POST'])
def analyze_conversion():
    """Analyze conversion data and train ML model (Mock implementation)"""
    try:
        # Mock response for demonstration
        # In a real implementation, this would process the uploaded file
        mock_response = {
            "data_summary": {
                "total_rows": 1000,
                "conversion_rate": 0.15,
                "features": ["age", "country", "total_pages_visited", "converted"]
            },
            "model_performance": {
                "metrics": {
                    "accuracy": 0.87,
                    "precision": 0.82,
                    "recall": 0.89,
                    "f1_score": 0.85
                },
                "feature_importance": {
                    "age": 0.35,
                    "total_pages_visited": 0.45,
                    "country_US": 0.12,
                    "country_UK": 0.08
                },
                "model_type": "Random Forest"
            },
            "recommendations": [
                "Focus marketing efforts on users aged 25-35 for highest conversion rates",
                "Improve user experience for visitors from UK to increase conversion likelihood",
                "Users who visit 10+ pages are 3x more likely to convert - implement engagement strategies",
                "Consider targeted campaigns for French market showing highest conversion potential"
            ]
        }
        
        return jsonify(mock_response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/abtest/analyze', methods=['POST'])
def analyze_abtest():
    """Analyze A/B test results"""
    try:
        data = request.get_json()
        
        # Mock analysis for demonstration
        results = {
            "test_results": [
                {
                    "test_group": "Control (A)",
                    "conversions": 847,
                    "total_users": 4982,
                    "conversion_rate": 0.17,
                    "confidence_interval": [0.158, 0.182]
                },
                {
                    "test_group": "Variant (B)",
                    "conversions": 1003,
                    "total_users": 5017,
                    "conversion_rate": 0.20,
                    "confidence_interval": [0.188, 0.212]
                }
            ],
            "statistical_analysis": {
                "p_value": 0.0023,
                "significance": True,
                "confidence_level": data.get('confidence_level', 95) if data else 95,
                "effect_size": 0.03,
                "recommendation": "Implement Variant B - shows statistically significant improvement",
                "winner": "Variant B"
            }
        }
        
        return jsonify(results)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/upload', methods=['POST'])
def handle_file_upload():
    """Handle file uploads"""
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Basic file validation
        if not file.filename.endswith('.csv'):
            return jsonify({"error": "Only CSV files are supported"}), 400
        
        # Mock response - in a real implementation, process the CSV here
        return jsonify({
            "status": "success",
            "filename": file.filename,
            "message": "File uploaded successfully"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting DS Challenges Backend Server...")
    print("📊 Conversion Analysis API: http://localhost:5000/api/conversion/analyze")
    print("🧪 A/B Testing API: http://localhost:5000/api/abtest/analyze")
    print("💚 Health Check: http://localhost:5000/api/health")
    app.run(debug=True, host='0.0.0.0', port=5000)