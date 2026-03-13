from flask import Flask, request, jsonify
from transformers import pipeline
import torch  # <-- VERY IMPORTANT

app = Flask(__name__)

# Load BERT sentiment model
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="nlptown/bert-base-multilingual-uncased-sentiment"
)

@app.route('/analyze', methods=['POST'])
def analyze_text():
    try:
        data = request.get_json()
        text = data.get('text', '')

        if not text or text.strip() == "":
            return jsonify({'error': 'No text provided'}), 400

        # Get prediction from BERT
        result = sentiment_analyzer(text)[0]

        print("BERT Output:", result)

        return jsonify({
            'label': result['label'],
            'score': float(result['score'])
        })

    except Exception as e:
        print("Error in BERT API:", str(e))
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
