import sys
import face_recognition

def verify_face(known_image_path, temp_image_path):
    try:
        known_image = face_recognition.load_image_file(known_image_path)
        temp_image = face_recognition.load_image_file(temp_image_path)
        
        known_encoding = face_recognition.face_encodings(known_image)
        temp_encoding = face_recognition.face_encodings(temp_image)
        
        if not known_encoding or not temp_encoding:
            return "No face found in one or both images"

        result = face_recognition.compare_faces([known_encoding[0]], temp_encoding[0])
        
        return "Match" if result[0] else "No Match"
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    known_path = sys.argv[1]
    temp_path = sys.argv[2]
    result = verify_face(known_path, temp_path)
    print(result)
