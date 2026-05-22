import customtkinter as ctk

# Theme setup
ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")


class QuizApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Python Quiz App")
        self.geometry("500x650")
        self.resizable(False, False)

        self.question_index = 0
        self.selected_answer = ctk.StringVar()
        self.user_answers = {}

        # 20 Questions
        self.questions = [

            {"question":"What is the capital of India?",
             "options":["Mumbai","New Delhi","Bengaluru","Chennai"],
             "answer":"New Delhi"},

            {"question":"Which keyword defines a function in Python?",
             "options":["func","define","def","function"],
             "answer":"def"},

            {"question":"Which data type stores True/False values?",
             "options":["String","Boolean","Integer","Float"],
             "answer":"Boolean"},

            {"question":"Which symbol is used for comments?",
             "options":["//","#","*","$"],
             "answer":"#"},

            {"question":"What does len() do?",
             "options":["Adds values","Counts items","Deletes values","Prints output"],
             "answer":"Counts items"},

            {"question":"Which operator is used for multiplication?",
             "options":["x","*","&","%"],
             "answer":"*"},

            {"question":"Which function displays output?",
             "options":["show()","print()","display()","echo()"],
             "answer":"print()"},

            {"question":"What is 5+3?",
             "options":["6","7","8","9"],
             "answer":"8"},

            {"question":"Which keyword is used for conditions?",
             "options":["for","if","while","def"],
             "answer":"if"},

            {"question":"Which loop repeats until condition becomes false?",
             "options":["while","for","if","switch"],
             "answer":"while"},

            {"question":"Which datatype uses [] brackets?",
             "options":["Tuple","Dictionary","List","String"],
             "answer":"List"},

            {"question":"Which datatype uses {} brackets?",
             "options":["Dictionary","List","Tuple","Integer"],
             "answer":"Dictionary"},

            {"question":"What is output of 10//3?",
             "options":["3","3.33","4","1"],
             "answer":"3"},

            {"question":"Which keyword exits a loop?",
             "options":["continue","skip","break","stop"],
             "answer":"break"},

            {"question":"Which keyword skips one iteration?",
             "options":["break","pass","continue","stop"],
             "answer":"continue"},

            {"question":"Which function accepts user input?",
             "options":["get()","scan()","input()","read()"],
             "answer":"input()"},

            {"question":"Which operator checks equality?",
             "options":["=","==","!=",">="],
             "answer":"=="},

            {"question":"What is Python file extension?",
             "options":[".java",".txt",".py",".html"],
             "answer":".py"},

            {"question":"Which keyword creates a class?",
             "options":["object","class","struct","define"],
             "answer":"class"},

            {"question":"Which function converts text into integer?",
             "options":["str()","float()","int()","bool()"],
             "answer":"int()"}
        ]

        self.create_widgets()
        self.load_question()

    def create_widgets(self):

        title = ctk.CTkLabel(
            self,
            text="Python Quiz App",
            font=ctk.CTkFont(size=28,weight="bold")
        )
        title.pack(pady=20)

        self.question_count = ctk.CTkLabel(
            self,
            text=""
        )
        self.question_count.pack()

        self.question_label = ctk.CTkLabel(
            self,
            text="",
            wraplength=400,
            font=ctk.CTkFont(size=18)
        )
        self.question_label.pack(pady=20)

        self.options_frame = ctk.CTkFrame(self)
        self.options_frame.pack(
            padx=40,
            pady=20,
            fill="both",
            expand=True
        )

        self.radio_buttons=[]

        button_frame = ctk.CTkFrame(
            self,
            fg_color="transparent"
        )

        button_frame.pack(pady=20)

        self.previous_button = ctk.CTkButton(
            button_frame,
            text="Previous",
            command=self.previous_question,
            width=120
        )

        self.previous_button.pack(
            side="left",
            padx=10
        )

        self.next_button = ctk.CTkButton(
            button_frame,
            text="Next",
            command=self.next_question,
            width=120
        )

        self.next_button.pack(
            side="left",
            padx=10
        )


    def load_question(self):

        q=self.questions[self.question_index]

        self.question_count.configure(
            text=f"Question {self.question_index+1}/{len(self.questions)}"
        )

        self.question_label.configure(
            text=q["question"]
        )

        for rb in self.radio_buttons:
            rb.destroy()

        self.radio_buttons.clear()

        for option in q["options"]:

            rb=ctk.CTkRadioButton(
                self.options_frame,
                text=option,
                variable=self.selected_answer,
                value=option
            )

            rb.pack(
                anchor="w",
                padx=20,
                pady=10
            )

            self.radio_buttons.append(rb)

        if self.question_index in self.user_answers:
            self.selected_answer.set(
                self.user_answers[self.question_index]
            )
        else:
            self.selected_answer.set("")

        if self.question_index==0:
            self.previous_button.configure(
                state="disabled"
            )
        else:
            self.previous_button.configure(
                state="normal"
            )


    def next_question(self):

        self.user_answers[self.question_index]=(
            self.selected_answer.get()
        )

        if self.question_index == len(self.questions)-1:
            self.show_result()
            return

        self.question_index +=1
        self.load_question()


    def previous_question(self):

        self.user_answers[self.question_index]=(
            self.selected_answer.get()
        )

        if self.question_index>0:
            self.question_index-=1
            self.load_question()


    def show_result(self):

        score=0

        for i,q in enumerate(self.questions):

            if i in self.user_answers:
                if self.user_answers[i]==q["answer"]:
                    score+=1

        self.question_label.configure(
            text=f"Quiz Finished!\n\nYour Score: {score}/{len(self.questions)}"
        )

        self.question_count.configure(text="")

        for rb in self.radio_buttons:
            rb.destroy()

        self.previous_button.pack_forget()

        self.next_button.configure(
            text="Exit",
            command=self.destroy
        )


if __name__=="__main__":
    app=QuizApp()
    app.mainloop()
