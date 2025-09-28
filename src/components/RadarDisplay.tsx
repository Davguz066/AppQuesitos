import React, { useState, useEffect } from 'react';
import cheeseWheel from '../assets/cheese-wheel.png';
import cheeseSlices from '../assets/cheese-slices-removebg-preview.png';
import babybelCheese from '../assets/babybel-cheese.png';
import blueCheese from '../assets/blue-cheese.png';
import granaPadano from '../assets/cuna_grana_padano.png';
import quesoBrie from '../assets/quesoBrie.png';
import antiGorda from '../assets/antiGorda.png';


interface ProductPosition {
  x: number; // Posición X en porcentaje
  y: number; // Posición Y en porcentaje
}

interface Product {
  id: number;
  image: string;
  name: string;
  position: ProductPosition;
  isMoving: boolean;
  isVisible?: boolean;
}

const RadarDisplay = () => {
  const generateRandomPosition = (): ProductPosition => {
    // Generar posiciones aleatorias dentro del área del radar
    // Usar coordenadas polares para mejor distribución
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 35 + 10; // Entre 10% y 45% desde el centro
    
    // Convertir coordenadas polares a cartesianas
    const x = 50 + radius * Math.cos(angle); // 50% es el centro
    const y = 50 + radius * Math.sin(angle);
    
    // Asegurar que esté dentro de los límites (5% a 95%)
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y))
    };
  };

  const initialProducts: Product[] = [
    { id: 1, image: cheeseWheel, name: 'Quesito', position: generateRandomPosition(), isMoving: false },
    { id: 2, image: granaPadano, name: 'Quesito', position: generateRandomPosition(), isMoving: false },
    { id: 3, image: cheeseSlices, name: 'Grupo de Quesitos', position: generateRandomPosition(), isMoving: false },
    { id: 4, image: blueCheese, name: 'Quesito', position: generateRandomPosition(), isMoving: false },
    { id: 5, image: babybelCheese, name: 'Quesito', position: generateRandomPosition(), isMoving: false },
    { id: 6, image: quesoBrie, name: 'Quesito', position: generateRandomPosition(), isMoving: false },
    { id: 7, image: antiGorda, name: 'Gorda detectada', position: generateRandomPosition(), isMoving: false, isVisible: false },
  ];

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [radarCycles, setRadarCycles] = useState(0);
  const [antiGordaDisappearing, setAntiGordaDisappearing] = useState(false);

  useEffect(() => {
    // Controlar la visibilidad de antiGorda basado en los ciclos del radar
    const radarCycleInterval = setInterval(() => {
      setRadarCycles(prevCycles => {
        const newCycles = prevCycles + 1;
        
        setProducts(prevProducts => 
          prevProducts.map(product => {
            if (product.name === 'Gorda detectada') {
              // Aparece en el ciclo 3, 7, 11, etc. (cada 4 ciclos, visible en el 3er ciclo)
              const shouldBeVisible = (newCycles % 4) === 3;
              
              // Si estaba visible y ahora debe desaparecer, activar animación de desaparición
              if (product.isVisible && !shouldBeVisible) {
                setAntiGordaDisappearing(true);
                // Después de la animación, ocultar completamente
                setTimeout(() => {
                  setAntiGordaDisappearing(false);
                }, 800); // Duración de la animación de desaparición
              }
              
              return {
                ...product,
                isVisible: shouldBeVisible,
                // Si aparece, generar nueva posición
                position: shouldBeVisible ? generateRandomPosition() : product.position
              };
            }
            return product;
          })
        );
        
        return newCycles;
      });
    }, 4000); // 4 segundos = 1 vuelta completa del radar

    const moveProducts = () => {
      // Marcar productos como "moviéndose" para activar transiciones
      setProducts(prevProducts => 
        prevProducts.map(product => ({
          ...product,
          isMoving: true
        }))
      );
      
      // Después de un pequeño delay, actualizar las posiciones
      setTimeout(() => {
        setProducts(prevProducts => 
          prevProducts.map((product, index) => {
            // No mover antiGorda si no está visible
            if (product.name === 'Gorda detectada' && !product.isVisible) {
              return {
                ...product,
                isMoving: false
              };
            }
            return {
              ...product,
              position: generateRandomPosition(),
              isMoving: false
            };
          })
        );
      }, 100);
    };

    // Mover los productos cada 6 segundos para más dinamismo
    const interval = setInterval(moveProducts, 10000); // Más lento: cada 10 segundos

    return () => {
      clearInterval(interval);
      clearInterval(radarCycleInterval);
    };
  }, []);

  return (
    <div className="radar-container">
      {/* Radar background circle */}
      <div className="radar-background"></div>
      
      {/* Radar rings */}
      <div className="radar-ring radar-ring-1"></div>
      <div className="radar-ring radar-ring-2"></div>
      <div className="radar-ring radar-ring-3"></div>
      <div className="radar-ring radar-ring-4"></div>
      
      {/* Center dot */}
      <div className="radar-center-dot"></div>
      
      {/* Radar sweep */}
      <div className="radar-sweep"></div>
      
      {/* Grid lines */}
      <div className="radar-grid-vertical"></div>
      <div className="radar-grid-horizontal"></div>
      
      {/* Products positioned around the radar */}
      {products.map((product, index) => (
        // Solo mostrar el producto si es visible (para antiGorda) o si no tiene la propiedad isVisible
        (product.isVisible !== false || (product.name === 'Gorda detectada' && antiGordaDisappearing)) && (
          <div
            key={product.id}
            className={`product-item ${product.isMoving ? 'product-item-moving' : ''} ${
              product.name === 'Gorda detectada' && product.isVisible ? 'animate-product-appear' : ''
            } ${
              product.name === 'Gorda detectada' && antiGordaDisappearing ? 'animate-product-disappear' : ''
            }`}
            style={{
              left: `${product.position.x}%`,
              top: `${product.position.y}%`,
              transitionDelay: `${index * 0.2}s`
            }}
            title={product.name}
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="product-image"
            />
          </div>
        )
      ))}
    </div>
  );
};

export default RadarDisplay;