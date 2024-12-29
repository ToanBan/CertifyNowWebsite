from deepface import DeepFace
import sys
import json

def compare_faces(img1_path, img2_path):
    try:
        result = DeepFace.verify(img1_path, img2_path)
        return json.dumps({"verified": result['verified'], "distance": result['distance']})
    except Exception as e:
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    img1 = sys.argv[1]
    img2 = sys.argv[2]
    print(compare_faces(img1, img2))
