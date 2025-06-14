
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PropertyForm from '@/components/admin/PropertyForm';
import { useAuth } from '@/context/AuthContext';
import { useProperty, Property } from '@/context/PropertyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const { user } = useAuth();
  const { properties, deleteProperty } = useProperty();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Redirect if user is not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const filteredProperties = properties.filter(property => {
    const query = searchQuery.toLowerCase();
    return (
      property.title.toLowerCase().includes(query) ||
      property.description.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query) ||
      property.propertyType.toLowerCase().includes(query)
    );
  });

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (property: Property) => {
    setSelectedProperty(property);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProperty) {
      deleteProperty(selectedProperty.id);
      toast({
        title: "Property deleted",
        description: "The property has been successfully deleted.",
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">
              Manage properties and monitor system activity
            </p>
          </div>
          
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Table>
            <TableCaption>A list of all properties in the system.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Listed Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No properties found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.propertyType}</TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell className="text-right">{formatPrice(property.price)}</TableCell>
                    <TableCell>{formatDate(property.listedAt)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(property)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(property)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Property Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new property listing.
            </DialogDescription>
          </DialogHeader>
          
          <PropertyForm onSaved={() => setIsAddDialogOpen(false)} />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Property Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>
              Update the property information.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProperty && (
            <PropertyForm 
              property={selectedProperty} 
              onSaved={() => setIsEditDialogOpen(false)} 
            />
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedProperty?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
