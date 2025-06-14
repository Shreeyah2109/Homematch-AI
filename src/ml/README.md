
# Machine Learning Models Directory

This directory is designated for machine learning models that power the property compatibility scoring system.

## Structure

- `models/` - Directory containing exported ML models (saved in formats like .json, .onnx, etc.)
- `training/` - Directory for Jupyter notebooks (.ipynb files) used for model training and evaluation

## Integration Guide

1. **Model Training Process**:
   - Use Jupyter notebooks in the `training/` directory to develop and train compatibility scoring models
   - Models should be trained to predict compatibility scores based on user preferences and property features
   - Export trained models in a format compatible with JavaScript (TensorFlow.js, ONNX, etc.)

2. **Model Deployment**:
   - Save exported models in the `models/` directory
   - Update the MLService.ts file to load and utilize these models

3. **Example ML Tasks**:
   - Property-user preference matching
   - Price prediction and recommendation
   - Location clustering based on facilities
   - Similarity scoring between properties

## Model Integration Points

The system is designed to use these models in the following components:
- PropertyContext.tsx: For calculating compatibility scores
- Admin dashboard: For property insights and recommendations
- User preference page: For suggesting optimal preference adjustments
