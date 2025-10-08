import java.util.Scanner;
import java.lang.Math;

public class FunctionCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Введите номер функции (1-6, 9-14): ");
        int number = scanner.nextInt();
        System.out.print("Введите x: ");
        double x = scanner.nextDouble();
        System.out.print("Введите параметр a: ");
        double a = scanner.nextDouble();
        System.out.print("Введите параметр b: ");
        double b = scanner.nextDouble();

        double result = 0;
        switch (number) {
            case 1: result = function1(x, a, b); break;
            case 2: result = function2(x, a, b); break;
            case 3: result = function3(x, a, b); break;
            case 4: result = function4(x, a, b); break;
            case 5: result = function5(x, a, b); break;
            case 6: result = function6(x, a, b); break;
            case 9: result = function9(x, a, b); break;
            case 10: result = function10(x, a, b); break;
            case 11: result = function11(x, a, b); break;
            case 12: result = function12(x, a, b); break;
            case 13: result = function13(x, a, b); break;
            case 14: result = function14(x, a, b); break;
            default: System.out.println("Неверный номер функции."); return;
        }
        System.out.println("y = " + result);
    }

    // №1
    public static double function1(double x, double a, double b) {
        if (x <= 3) {
            if (x == 0) return Double.NaN; 
            return b + 2 * Math.log(Math.abs(x));
        } else {
            return (x * x) / (x * x + a);
        }
    }

    // №2
    public static double function2(double x, double a, double b) {
        if (x > 0) {
            return a + 0.5 * Math.exp(-x);
        } else {
            return Math.cos(b * x + 1);
        }
    }

    // №3
    public static double function3(double x, double a, double b) {
        if (x <= 1) {
            return 1 / (a * a + x * x);
        } else {
            if (x == 0) return Double.NaN; 
            return b * Math.log(Math.abs(x));
        }
    }

    // №4
    public static double function4(double x, double a, double b) {
        if (x <= 2) {
            if (x + 1 <= 0) return Double.NaN; 
            if (b + Math.log(x + 1) == 0) return Double.NaN;
            return (a + x * x) / (b + Math.log(x + 1));
        } else {
            return Math.exp(x) + x * x;
        }
    }

    // №5
    public static double function5(double x, double a, double b) {
        if (x <= 1) {
            if (x < 0) return Double.NaN; 
            return a * Math.pow(Math.sin(x), 2) + Math.sqrt(x);
        } else {
            return b * Math.exp(x * x);
        }
    }

    // №6
    public static double function6(double x, double a, double b) {
        if (x <= -1) {
            double xSquared = x * x;
            if (Math.cos(xSquared) == 0) return Double.NaN;
            return a * Math.tan(xSquared);
        } else {
            return b + (x * x) / (x * x + a);
        }
    }

    // №9
    public static double function9(double x, double a, double b) {
        if (x >= 2) {
            if (a * x < 0) return Double.NaN; 
            return Math.sqrt(1 + x * Math.sqrt(a * x));
        } else {
            return a * Math.sin(b * x) + 3;
        }
    }

    // №10
    public static double function10(double x, double a, double b) {
        if (x <= 0) {
            double exponent = Math.exp(2 * x - b);
            if (exponent - 1 < 0) return Double.NaN; 
            return Math.sqrt(exponent - 1);
        } else {
            return 1 / (x * x + a);
        }
    }

    // №11
    public static double function11(double x, double a, double b) {
        if (x > 4) {
            if (a + Math.abs(Math.sin(x)) < 0) return Double.NaN; 
            return Math.sqrt(a + Math.abs(Math.sin(x)));
        } else {
            return Math.tan(b * x);
        }
    }

    // №12
    public static double function12(double x, double a, double b) {
        if (x <= 1) {
            return 2 * x * x + a * Math.cos(b * x);
        } else {
            double xCubed = x * x * x;
            if (Math.cos(xCubed) == 0) return Double.NaN;
            return Math.exp(x) + Math.tan(xCubed);
        }
    }

    // №13
    public static double function13(double x, double a, double b) {
        if (x >= 2) {
            if (a + x * x <= 0) return Double.NaN; 
            return Math.log(a + x * x);
        } else {
            return Math.exp(Math.sin(x)) + 2 * b;
        }
    }

    // №14
    public static double function14(double x, double a, double b) {
        if (x > -1) {
            return 0.2 * x * x * x + a; 
        } else {
            if (x + 3 == 0) return Double.NaN; 
            return b * x * x + Math.log(Math.abs(x + 3));
        }
    }
}