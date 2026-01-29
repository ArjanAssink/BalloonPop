#!/usr/bin/env python3

def test_general_knowledge_questions():
    """Test that general knowledge questions are properly expanded"""
    try:
        with open('js/script.js', 'r') as f:
            js_content = f.read()
        
        # Count the number of general knowledge questions
        general_start = js_content.find('general: [')
        if general_start == -1:
            print("❌ General knowledge section not found")
            return False
        
        # Find the end of the general section
        general_end = js_content.find('];', general_start) + 2
        general_section = js_content[general_start:general_end]
        
        # Count question objects
        question_count = general_section.count('question: ')
        
        if question_count < 10:
            print(f"❌ Only {question_count} general knowledge questions found, expected at least 10")
            return False
        
        # Check for some of the new questions
        if 'Welk dier zegt' not in js_content:
            print("❌ Animal sound question not found")
            return False
        
        if 'Hoeveel poten heeft een spin' not in js_content:
            print("❌ Spider legs question not found")
            return False
        
        if 'Welke planeet wonen wij op' not in js_content:
            print("❌ Planet question not found")
            return False
        
        print(f"✅ Found {question_count} general knowledge questions!")
        return True
        
    except Exception as e:
        print(f"❌ Error reading JS file: {e}")
        return False

if __name__ == "__main__":
    if test_general_knowledge_questions():
        print("\n🎉 General knowledge questions have been successfully expanded!")
    else:
        print("\n❌ General knowledge questions implementation incomplete")