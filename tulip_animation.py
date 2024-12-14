import turtle
import math
from time import sleep

# Set up the screen
screen = turtle.Screen()
screen.bgcolor("sky blue")
screen.title("Para Jeydy con amor ❤️")
screen.setup(800, 600)

# Create the main turtle for drawing
t = turtle.Turtle()
t.speed(0)  # Fastest speed
t.hideturtle()

def draw_tulip(x, y, color):
    """Draw a single tulip at the specified position"""
    t.penup()
    t.goto(x, y)
    t.pendown()
    
    # Draw stem
    t.color("green")
    t.setheading(90)
    t.pensize(4)
    t.forward(100)
    
    # Draw flower
    t.color(color)
    t.pensize(1)
    t.fillcolor(color)
    
    # Draw petals
    for _ in range(3):
        t.begin_fill()
        t.circle(20, 60)
        t.left(120)
        t.circle(20, 60)
        t.left(120)
        t.end_fill()
        t.left(120)

def write_name():
    """Write 'Jeydy' with decorative style"""
    t.penup()
    t.goto(-100, -150)
    t.color("purple")
    t.write("Jeydy", font=("Arial", 48, "bold"))

def animate_tulips():
    """Create moving tulips animation"""
    colors = ["red", "pink", "purple"]
    positions = [(-200, -100), (0, -100), (200, -100)]
    
    while True:
        screen.clear()
        screen.bgcolor("sky blue")
        
        # Move tulips up and down with a wave effect
        for i in range(60):
            t.clear()
            for j, (x, y) in enumerate(positions):
                new_y = y + math.sin(i/10 + j) * 20
                draw_tulip(x, new_y, colors[j])
            write_name()
            screen.update()
            sleep(0.05)

# Start the animation
screen.tracer(0)  # Turn off automatic updates
animate_tulips()

# Keep the window open
screen.mainloop()